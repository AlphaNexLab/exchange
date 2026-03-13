const { randomUUID } = require("node:crypto");
const { readStore, writeStore } = require("./store");

function listOffers(statuses = ["open", "funded"]) {
  const db = readStore();
  return db.offers
    .filter((o) => statuses.includes(o.status))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

function getOffer(id) {
  return readStore().offers.find((o) => o.id === id) || null;
}

function createOffer(input) {
  const db = readStore();
  const now = new Date().toISOString();
  const offer = {
    id: randomUUID(),
    seller: input.seller,
    amountEth: String(input.amountEth),
    pricePerEth: Number(input.pricePerEth),
    method: input.method,
    tag: input.tag,
    rating: 5,
    tradesCount: 0,
    status: "open",
    createdAt: now,
    updatedAt: now,
  };
  db.offers.unshift(offer);
  writeStore(db);
  return offer;
}

function updateOffer(id, patch) {
  const db = readStore();
  const idx = db.offers.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  db.offers[idx] = {
    ...db.offers[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  writeStore(db);
  return db.offers[idx];
}

module.exports = {
  listOffers,
  getOffer,
  createOffer,
  updateOffer,
};
