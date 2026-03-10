import { expect } from "chai";
import {
  ethers,
  fundedEscrowFixture,
  networkHelpers,
} from "../../helpers/fixtures.js";
import { STATUS } from "../../helpers/constants.js";

describe("P2PEscrow — refund", function () {
  it("refunds to seller via verifier", async function () {
    const { escrow, verifier, seller, tradeId, amount } =
      await networkHelpers.loadFixture(fundedEscrowFixture);

    await expect(escrow.connect(verifier).refund(tradeId))
      .to.emit(escrow, "TradeRefunded")
      .withArgs(tradeId, seller.address, amount);

    expect((await escrow.trades(tradeId)).status).to.equal(STATUS.Refunded);
  });

  it("allows anyone to refund after deadline", async function () {
    const { escrow, seller, other, tradeId, amount, deadline } =
      await networkHelpers.loadFixture(fundedEscrowFixture);

    await expect(escrow.connect(other).refund(tradeId)).to.revert(ethers);

    await networkHelpers.time.increaseTo(deadline + 1n);

    await expect(escrow.connect(other).refund(tradeId))
      .to.emit(escrow, "TradeRefunded")
      .withArgs(tradeId, seller.address, amount);
  });
});
