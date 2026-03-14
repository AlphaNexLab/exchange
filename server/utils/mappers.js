function mapOffer(o) {
  return {
    id: o.id,
    seller: o.seller,
    amount: Number(o.amountEth),
    amountEth: o.amountEth,
    pricePerAnx: o.pricePerEth,
    pricePerEth: o.pricePerEth,
    method: o.method,
    tag: o.tag,
    rating: o.rating,
    trades: o.tradesCount,
    status: o.status,
  };
}

module.exports = { mapOffer };
