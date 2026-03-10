import { network } from "hardhat";
import { ONE_ETH, TRADE_WINDOW_SECONDS } from "./constants.js";

const connection = await network.create();
export const { ethers, networkHelpers } = connection;

export async function deployEscrowFixture() {
  const [verifier, seller, buyer, other] = await ethers.getSigners();
  const escrow = await ethers.deployContract("P2PEscrow", [verifier.address]);
  const tradeId = ethers.id("trade-1");
  const amount = ethers.parseEther(ONE_ETH);
  const latest = await ethers.provider.getBlock("latest");
  const deadline = BigInt(latest!.timestamp) + TRADE_WINDOW_SECONDS;

  return { escrow, verifier, seller, buyer, other, tradeId, amount, deadline };
}

export async function fundedEscrowFixture() {
  const ctx = await deployEscrowFixture();
  await ctx.escrow
    .connect(ctx.seller)
    .createTrade(ctx.tradeId, ctx.buyer.address, ctx.deadline, {
      value: ctx.amount,
    });
  return ctx;
}
