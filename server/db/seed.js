function createSeedData() {
  const now = new Date().toISOString();
  return {
    offers: [
      {
        id: "demo-1",
        seller: "0x1111111111111111111111111111111111111111",
        amountEth: "0.5",
        pricePerEth: 3200,
        method: "Revolut",
        tag: "@ergo_seller1",
        rating: 4.8,
        tradesCount: 12,
        status: "open",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "demo-2",
        seller: "0x2222222222222222222222222222222222222222",
        amountEth: "1.2",
        pricePerEth: 3185,
        method: "Wise",
        tag: "seller@proton.me",
        rating: 4.9,
        tradesCount: 34,
        status: "open",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "demo-3",
        seller: "0x3333333333333333333333333333333333333333",
        amountEth: "0.25",
        pricePerEth: 3220,
        method: "PayPal",
        tag: "@crypto_paolo",
        rating: 4.6,
        tradesCount: 8,
        status: "open",
        createdAt: now,
        updatedAt: now,
      },
    ],
    trades: [],
    sessions: {},
    nonces: {},
  };
}

module.exports = { createSeedData };
