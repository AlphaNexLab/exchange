/** Minimal P2PEscrow ABI used by the verifier wallet and fund checks. */
const p2pEscrowAbi = [
  {
    type: "function",
    name: "trades",
    stateMutability: "view",
    inputs: [{ name: "tradeId", type: "bytes32" }],
    outputs: [
      { name: "seller", type: "address" },
      { name: "buyer", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "deadline", type: "uint64" },
      { name: "status", type: "uint8" },
    ],
  },
  {
    type: "function",
    name: "release",
    stateMutability: "nonpayable",
    inputs: [{ name: "tradeId", type: "bytes32" }],
    outputs: [],
  },
  {
    type: "function",
    name: "refund",
    stateMutability: "nonpayable",
    inputs: [{ name: "tradeId", type: "bytes32" }],
    outputs: [],
  },
];

module.exports = { p2pEscrowAbi };
