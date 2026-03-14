const { httpError } = require("../utils/http-error");
const { loadConfig } = require("../config");
const { getSession } = require("../db/sessions.repository");

function getBearerToken(request) {
  const header = request.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return null;
  const token = header.slice(7).trim();
  return token || null;
}

function requireAddress(request) {
  const token = getBearerToken(request);
  if (!token) {
    throw httpError(401, "Authorization: Bearer <session token> required");
  }
  const session = getSession(token);
  if (!session) {
    throw httpError(401, "Session expired or invalid — sign in with SIWE");
  }
  request.userAddress = session.address;
  return session.address;
}

function requireVerifier(request) {
  const { verifierApiKey } = loadConfig();
  if (request.headers["x-verifier-key"] !== verifierApiKey) {
    throw httpError(401, "Invalid verifier key");
  }
}

module.exports = {
  getBearerToken,
  requireAddress,
  requireVerifier,
};
