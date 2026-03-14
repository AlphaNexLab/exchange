const {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  getAddress,
} = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { sepolia } = require("viem/chains");
const { loadConfig } = require("../config");
const { p2pEscrowAbi } = require("../abi/p2pEscrow");
const { httpError } = require("../utils/http-error");

/** Matches P2PEscrow.Status.Active */
const STATUS_ACTIVE = 1;

function isChainEnabled() {
  return loadConfig().chainEnabled;
}

function getPublicClient() {
  const { rpcUrl } = loadConfig();
  return createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  });
}

function getClients() {
  const { escrowAddress, verifierPrivateKey, rpcUrl, chainEnabled } =
    loadConfig();

  if (!chainEnabled) {
    throw httpError(
      503,
      "On-chain escrow not configured (ESCROW_ADDRESS / VERIFIER_PRIVATE_KEY)"
    );
  }

  const account = privateKeyToAccount(verifierPrivateKey);
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  });
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(rpcUrl),
  });

  return { publicClient, walletClient, escrowAddress };
}

async function verifyCreateTradeTx({
  createTxHash,
  onChainTradeId,
  seller,
  buyer,
  amountEth,
}) {
  const { escrowAddress } = loadConfig();
  const publicClient = getPublicClient();

  let receipt;
  try {
    receipt = await publicClient.getTransactionReceipt({
      hash: createTxHash,
    });
  } catch {
    throw httpError(400, "Transaction receipt not found");
  }

  if (!receipt || receipt.status !== "success") {
    throw httpError(400, "Funding transaction failed on-chain");
  }

  const to = receipt.to ? getAddress(receipt.to) : null;
  if (!to || to !== getAddress(escrowAddress)) {
    throw httpError(400, "Transaction was not sent to the escrow contract");
  }

  let onChain;
  try {
    onChain = await publicClient.readContract({
      address: escrowAddress,
      abi: p2pEscrowAbi,
      functionName: "trades",
      args: [onChainTradeId],
    });
  } catch (err) {
    throw httpError(
      400,
      err instanceof Error
        ? `Failed to read on-chain trade: ${err.message}`
        : "Failed to read on-chain trade"
    );
  }

  const [onSeller, onBuyer, onAmount, , onStatus] = onChain;
  if (Number(onStatus) !== STATUS_ACTIVE) {
    throw httpError(400, "On-chain trade is not Active");
  }
  if (onSeller.toLowerCase() !== seller.toLowerCase()) {
    throw httpError(400, "On-chain seller does not match trade");
  }
  if (onBuyer.toLowerCase() !== buyer.toLowerCase()) {
    throw httpError(400, "On-chain buyer does not match trade");
  }

  const expectedAmount = parseEther(String(amountEth));
  if (onAmount !== expectedAmount) {
    throw httpError(400, "On-chain amount does not match trade");
  }

  return true;
}

async function releaseOnChain(tradeId) {
  const { publicClient, walletClient, escrowAddress } = getClients();
  const hash = await walletClient.writeContract({
    address: escrowAddress,
    abi: p2pEscrowAbi,
    functionName: "release",
    args: [tradeId],
  });
  await publicClient.waitForTransactionReceipt({ hash });
  return hash;
}

async function refundOnChain(tradeId) {
  const { publicClient, walletClient, escrowAddress } = getClients();
  const hash = await walletClient.writeContract({
    address: escrowAddress,
    abi: p2pEscrowAbi,
    functionName: "refund",
    args: [tradeId],
  });
  await publicClient.waitForTransactionReceipt({ hash });
  return hash;
}

module.exports = {
  isChainEnabled,
  verifyCreateTradeTx,
  releaseOnChain,
  refundOnChain,
};
