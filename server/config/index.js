const { ZERO_ADDRESS } = require("./constants");

function loadConfig() {
  const escrowAddress = process.env.ESCROW_ADDRESS || ZERO_ADDRESS;
  const verifierPrivateKey = process.env.VERIFIER_PRIVATE_KEY || "";

  const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
  let siweUri = process.env.SIWE_URI || corsOrigin;
  let siweDomain = process.env.SIWE_DOMAIN;
  if (!siweDomain) {
    try {
      siweDomain = new URL(siweUri).host;
    } catch {
      siweDomain = "localhost:3000";
    }
  }

  return {
    port: Number(process.env.PORT || 4000),
    corsOrigin,
    chainId: Number(process.env.CHAIN_ID || 11155111),
    rpcUrl:
      process.env.RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com",
    escrowAddress,
    verifierPrivateKey,
    verifierApiKey: process.env.VERIFIER_API_KEY || "dev-verifier-key",
    siweDomain,
    siweUri,
    chainEnabled:
      Boolean(verifierPrivateKey) &&
      Boolean(escrowAddress) &&
      escrowAddress !== ZERO_ADDRESS,
  };
}

module.exports = { loadConfig };
