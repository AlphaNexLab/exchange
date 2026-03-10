import { expect } from "chai";
import {
  deployEscrowFixture,
  ethers,
  networkHelpers,
} from "../../helpers/fixtures.js";
import { STATUS } from "../../helpers/constants.js";

describe("P2PEscrow — createTrade", function () {
  it("creates a trade and locks ETH", async function () {
    const { escrow, seller, buyer, tradeId, amount, deadline } =
      await networkHelpers.loadFixture(deployEscrowFixture);

    await expect(
      escrow.connect(seller).createTrade(tradeId, buyer.address, deadline, {
        value: amount,
      }),
    )
      .to.emit(escrow, "TradeCreated")
      .withArgs(tradeId, seller.address, buyer.address, amount, deadline);

    const trade = await escrow.trades(tradeId);
    expect(trade.seller).to.equal(seller.address);
    expect(trade.buyer).to.equal(buyer.address);
    expect(trade.amount).to.equal(amount);
    expect(trade.status).to.equal(STATUS.Active);
    expect(await ethers.provider.getBalance(await escrow.getAddress())).to.equal(
      amount,
    );
  });

  it("rejects duplicate trade ids and zero value", async function () {
    const { escrow, seller, buyer, tradeId, amount, deadline } =
      await networkHelpers.loadFixture(deployEscrowFixture);

    await expect(
      escrow.connect(seller).createTrade(tradeId, buyer.address, deadline, {
        value: 0,
      }),
    ).to.revert(ethers);

    await escrow.connect(seller).createTrade(tradeId, buyer.address, deadline, {
      value: amount,
    });

    await expect(
      escrow.connect(seller).createTrade(tradeId, buyer.address, deadline, {
        value: amount,
      }),
    ).to.revert(ethers);
  });
});
