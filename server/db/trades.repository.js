const { readStore, writeStore } = require("./store");

function getTrade(id) {
  return readStore().trades.find((t) => t.id === id) || null;
}

function listTradesForAddress(address, role) {
  const addr = address.toLowerCase();
  return readStore().trades.filter((t) => {
    if (role === "buyer") return t.buyer === addr;
    if (role === "seller") return t.seller === addr;
    return t.buyer === addr || t.seller === addr;
  });
}

function createTrade(input) {
  const db = readStore();
  const now = new Date().toISOString();
  const trade = {
    id: input.id,
    offerId: input.offerId,
    seller: input.seller,
    buyer: input.buyer,
    amountEth: String(input.amountEth),
    pricePerEth: Number(input.pricePerEth),
    method: input.method,
    tag: input.tag,
    onChainTradeId: input.onChainTradeId,
    status: "open",
    deadline: input.deadline,
    createTxHash: null,
    releaseTxHash: null,
    refundTxHash: null,
    createdAt: now,
    updatedAt: now,
  };
  db.trades.unshift(trade);
  writeStore(db);
  return trade;
}

function updateTrade(id, patch) {
  const db = readStore();
  const idx = db.trades.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  db.trades[idx] = {
    ...db.trades[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  writeStore(db);
  return db.trades[idx];
}

module.exports = {
  getTrade,
  listTradesForAddress,
  createTrade,
  updateTrade,
};
