// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Public surface for the P2P native-ETH escrow.
interface IP2PEscrow {
    enum Status {
        None,
        Active,
        Released,
        Refunded
    }

    struct Trade {
        address seller;
        address buyer;
        uint256 amount;
        uint64 deadline;
        Status status;
    }

    event TradeCreated(
        bytes32 indexed tradeId,
        address indexed seller,
        address indexed buyer,
        uint256 amount,
        uint64 deadline
    );
    event TradeReleased(bytes32 indexed tradeId, address indexed buyer, uint256 amount);
    event TradeRefunded(bytes32 indexed tradeId, address indexed seller, uint256 amount);

    function verifier() external view returns (address);

    function trades(bytes32 tradeId)
        external
        view
        returns (
            address seller,
            address buyer,
            uint256 amount,
            uint64 deadline,
            Status status
        );

    function createTrade(bytes32 tradeId, address buyer, uint64 deadline) external payable;

    function release(bytes32 tradeId) external;

    function refund(bytes32 tradeId) external;
}
