// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IP2PEscrow} from "./interfaces/IP2PEscrow.sol";
import {
    ZeroAddress,
    InvalidAmount,
    InvalidDeadline,
    TradeExists,
    TradeNotActive,
    Unauthorized,
    TransferFailed
} from "./errors/EscrowErrors.sol";

/// @title P2PEscrow — native ETH escrow for fiat↔crypto P2P trades
/// @notice Seller locks ETH; a trusted verifier releases to buyer or refunds seller.
contract P2PEscrow is IP2PEscrow {
    address public immutable override verifier;

    mapping(bytes32 => Trade) private _trades;

    modifier onlyVerifier() {
        if (msg.sender != verifier) revert Unauthorized();
        _;
    }

    constructor(address verifier_) {
        if (verifier_ == address(0)) revert ZeroAddress();
        verifier = verifier_;
    }

    /// @inheritdoc IP2PEscrow
    function trades(bytes32 tradeId)
        external
        view
        override
        returns (
            address seller,
            address buyer,
            uint256 amount,
            uint64 deadline,
            Status status
        )
    {
        Trade storage t = _trades[tradeId];
        return (t.seller, t.buyer, t.amount, t.deadline, t.status);
    }

    /// @inheritdoc IP2PEscrow
    function createTrade(bytes32 tradeId, address buyer, uint64 deadline) external payable override {
        if (buyer == address(0)) revert ZeroAddress();
        if (msg.value == 0) revert InvalidAmount();
        if (deadline <= block.timestamp) revert InvalidDeadline();
        if (_trades[tradeId].status != Status.None) revert TradeExists();

        _trades[tradeId] = Trade({
            seller: msg.sender,
            buyer: buyer,
            amount: msg.value,
            deadline: deadline,
            status: Status.Active
        });

        emit TradeCreated(tradeId, msg.sender, buyer, msg.value, deadline);
    }

    /// @inheritdoc IP2PEscrow
    function release(bytes32 tradeId) external override onlyVerifier {
        Trade storage t = _trades[tradeId];
        if (t.status != Status.Active) revert TradeNotActive();

        t.status = Status.Released;
        uint256 amount = t.amount;
        address buyer = t.buyer;

        (bool ok, ) = buyer.call{value: amount}("");
        if (!ok) revert TransferFailed();

        emit TradeReleased(tradeId, buyer, amount);
    }

    /// @inheritdoc IP2PEscrow
    function refund(bytes32 tradeId) external override {
        Trade storage t = _trades[tradeId];
        if (t.status != Status.Active) revert TradeNotActive();

        bool authorized = msg.sender == verifier || block.timestamp >= t.deadline;
        if (!authorized) revert Unauthorized();

        t.status = Status.Refunded;
        uint256 amount = t.amount;
        address seller = t.seller;

        (bool ok, ) = seller.call{value: amount}("");
        if (!ok) revert TransferFailed();

        emit TradeRefunded(tradeId, seller, amount);
    }
}
