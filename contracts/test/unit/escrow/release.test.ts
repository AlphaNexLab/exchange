import { expect } from "chai";
import {
  ethers,
  fundedEscrowFixture,
  networkHelpers,
} from "../../helpers/fixtures.js";
import { STATUS } from "../../helpers/constants.js";

describe("P2PEscrow — release", function () {
  it("releases ETH to buyer (verifier only)", async function () {
    const { escrow, verifier, buyer, other, tradeId, amount } =
      await networkHelpers.loadFixture(fundedEscrowFixture);

    await expect(escrow.connect(other).release(tradeId)).to.revert(ethers);

    await expect(escrow.connect(verifier).release(tradeId))
      .to.emit(escrow, "TradeReleased")
      .withArgs(tradeId, buyer.address, amount);

    expect((await escrow.trades(tradeId)).status).to.equal(STATUS.Released);
    await expect(escrow.connect(verifier).release(tradeId)).to.revert(ethers);
  });
});
