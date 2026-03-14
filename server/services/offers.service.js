const db = require("../db");
const { PAYMENT_METHODS } = require("../config/constants");
const { mapOffer } = require("../utils/mappers");
const { httpError } = require("../utils/http-error");

function listPublicOffers() {
  return db.listOffers().map(mapOffer);
}

function getPublicOffer(id) {
  const offer = db.getOffer(id);
  if (!offer) throw httpError(404, "Offer not found");
  return mapOffer(offer);
}

function createPublicOffer(seller, body) {
  const amountEth = String(body.amountEth ?? "");
  const pricePerEth = Number(body.pricePerEth);
  const method = body.method;
  const tag = body.tag;

  if (!(Number(amountEth) > 0)) {
    throw httpError(400, "amountEth must be > 0");
  }
  if (!(pricePerEth > 0)) {
    throw httpError(400, "pricePerEth must be > 0");
  }
  if (!PAYMENT_METHODS.includes(method)) {
    throw httpError(400, "Invalid payment method");
  }
  if (!tag || typeof tag !== "string") {
    throw httpError(400, "tag required");
  }

  const offer = db.createOffer({
    seller,
    amountEth,
    pricePerEth,
    method,
    tag,
  });

  return mapOffer(offer);
}

module.exports = {
  listPublicOffers,
  getPublicOffer,
  createPublicOffer,
};
