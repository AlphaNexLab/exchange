const { randomBytes, randomUUID } = require("node:crypto");
const { readStore, writeStore } = require("./store");

const NONCE_TTL_MS = 10 * 60 * 1000;
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function ensureAuthCollections(db) {
  if (!db.sessions || typeof db.sessions !== "object") db.sessions = {};
  if (!db.nonces || typeof db.nonces !== "object") db.nonces = {};
  return db;
}

function pruneExpired(db) {
  const now = Date.now();
  for (const [token, session] of Object.entries(db.sessions)) {
    if (!session?.expiresAt || Date.parse(session.expiresAt) <= now) {
      delete db.sessions[token];
    }
  }
  for (const [address, entry] of Object.entries(db.nonces)) {
    if (!entry?.expiresAt || Date.parse(entry.expiresAt) <= now) {
      delete db.nonces[address];
    }
  }
}

function issueNonce(address) {
  const db = ensureAuthCollections(readStore());
  pruneExpired(db);
  const key = address.toLowerCase();
  const nonce = randomBytes(16).toString("hex");
  db.nonces[key] = {
    nonce,
    expiresAt: new Date(Date.now() + NONCE_TTL_MS).toISOString(),
  };
  writeStore(db);
  return nonce;
}

function consumeNonce(address, expectedNonce) {
  const db = ensureAuthCollections(readStore());
  pruneExpired(db);
  const key = address.toLowerCase();
  const entry = db.nonces[key];
  if (!entry || entry.nonce !== expectedNonce) {
    return false;
  }
  delete db.nonces[key];
  writeStore(db);
  return true;
}

function createSession(address) {
  const db = ensureAuthCollections(readStore());
  pruneExpired(db);
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  db.sessions[token] = {
    address: address.toLowerCase(),
    expiresAt,
    createdAt: new Date().toISOString(),
  };
  writeStore(db);
  return { token, address: address.toLowerCase(), expiresAt };
}

function getSession(token) {
  if (!token) return null;
  const db = ensureAuthCollections(readStore());
  pruneExpired(db);
  const session = db.sessions[token];
  if (!session) return null;
  if (Date.parse(session.expiresAt) <= Date.now()) {
    delete db.sessions[token];
    writeStore(db);
    return null;
  }
  return session;
}

function revokeSession(token) {
  if (!token) return;
  const db = ensureAuthCollections(readStore());
  if (db.sessions[token]) {
    delete db.sessions[token];
    writeStore(db);
  }
}

module.exports = {
  issueNonce,
  consumeNonce,
  createSession,
  getSession,
  revokeSession,
  NONCE_TTL_MS,
  SESSION_TTL_MS,
};
