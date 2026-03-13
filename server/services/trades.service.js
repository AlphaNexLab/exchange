const { randomUUID } = require("node:crypto");
const { keccak256, toBytes } = require("viem");
const db = require("../db");
const { TRADE_DEADLINE_MS } = require("../config/constants");
const { httpError } = require("../utils/http-error");
const {
  isChainEnabled,
  verifyCreateTradeTx,
  releaseOnChain,
  refundOnChain,
} = require("./escrow.service");

function getTradeById(id) {
  const trade = db.getTrade(id);
  if (!trade) throw httpError(404, "Trade not found");
  return trade;
}

function getTradeForParty(id, address) {
  const trade = getTradeById(id);
  const addr = address.toLowerCase();
  if (trade.buyer !== addr && trade.seller !== addr) {
    throw httpError(403, "Not a party to this trade");
  }
  return trade;
}

function listMyTrades(address, role) {
  return db.listTradesForAddress(address, role);
}

function openTrade(buyer, body) {
  const offer = db.getOffer(body.offerId);
  if (!offer || offer.status !== "open") {
    throw httpError(400, "Offer not available");
  }
  if (offer.seller === buyer) {
    throw httpError(400, "Cannot buy your own offer");
  }

  const amountEth = body.amountEth ? String(body.amountEth) : offer.amountEth;
  if (Number(amountEth) <= 0 || Number(amountEth) > Number(offer.amountEth)) {
    throw httpError(400, "Invalid amount");
  }

  const tradeId = randomUUID();
  const onChainTradeId = keccak256(toBytes(`trade:${tradeId}`));
  const deadline = new Date(Date.now() + TRADE_DEADLINE_MS).toISOString();

  const trade = db.createTrade({
    id: tradeId,
    offerId: offer.id,
    seller: offer.seller,
    buyer,
    amountEth,
    pricePerEth: offer.pricePerEth,
    method: offer.method,
    tag: offer.tag,
    onChainTradeId,
    deadline,
  });

  db.updateOffer(offer.id, { status: "reserved" });
  return trade;
}

async function markFunded(seller, tradeId, createTxHash) {
  const trade = getTradeById(tradeId);
  if (trade.seller !== seller) {
    throw httpError(403, "Only seller can mark funded");
  }
  if (trade.status !== "open") {
    throw httpError(400, `Trade status is ${trade.status}`);
  }
  if (!createTxHash || !/^0x[a-fA-F0-9]{64}$/.test(createTxHash)) {
    throw httpError(400, "Valid createTxHash required");
  }

  if (isChainEnabled()) {
    await verifyCreateTradeTx({
      createTxHash,
      onChainTradeId: trade.onChainTradeId,
      seller: trade.seller,
      buyer: trade.buyer,
      amountEth: trade.amountEth,
    });
  }

  return db.updateTrade(trade.id, {
    status: "funded",
    createTxHash,
  });
}

function markPaid(buyer, tradeId) {
  const trade = getTradeById(tradeId);
  if (trade.buyer !== buyer) {
    throw httpError(403, "Only buyer can mark paid");
  }
  if (trade.status !== "funded") {
    throw httpError(400, "Trade must be funded before marking paid");
  }

  return db.updateTrade(trade.id, { status: "paid" });
}

async function verifyTrade(tradeId) {
  const trade = getTradeById(tradeId);
  if (trade.status !== "paid" && trade.status !== "funded") {
    throw httpError(400, `Cannot verify trade in status ${trade.status}`);
  }

  let releaseTxHash = trade.releaseTxHash;
  const onChain = isChainEnabled();
  if (onChain) {
    releaseTxHash = await releaseOnChain(trade.onChainTradeId);
  } else {
    releaseTxHash = releaseTxHash || `0xmock_release_${trade.id}`;
  }

  const updated = db.updateTrade(trade.id, {
    status: "released",
    releaseTxHash,
  });

  const offer = db.getOffer(trade.offerId);
  if (offer) {
    db.updateOffer(trade.offerId, {
      status: "filled",
      tradesCount: (offer.tradesCount || 0) + 1,
    });
  }

  return { trade: updated, onChain };
}

async function refundTrade(tradeId) {
  const trade = getTradeById(tradeId);
  if (!["open", "funded", "paid"].includes(trade.status)) {
    throw httpError(400, `Cannot refund trade in status ${trade.status}`);
  }

  let refundTxHash = trade.refundTxHash;
  const onChain = isChainEnabled();
  if (onChain && trade.status !== "open") {
    refundTxHash = await refundOnChain(trade.onChainTradeId);
  } else if (!onChain) {
    refundTxHash = refundTxHash || `0xmock_refund_${trade.id}`;
  }

  const updated = db.updateTrade(trade.id, {
    status: "refunded",
    refundTxHash,
  });
  db.updateOffer(trade.offerId, { status: "open" });

  return { trade: updated, onChain };
}

module.exports = {
  getTradeById,
  getTradeForParty,
  listMyTrades,
  openTrade,
  markFunded,
  markPaid,
  verifyTrade,
  refundTrade,
};
