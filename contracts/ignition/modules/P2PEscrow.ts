import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * Ignition deploy module.
 * Pass verifier via: npx hardhat ignition deploy ignition/modules/P2PEscrow.ts --parameters '{"verifier":"0x..."}'
 */
export default buildModule("P2PEscrowModule", (m) => {
  const verifier = m.getParameter("verifier");
  const escrow = m.contract("P2PEscrow", [verifier]);
  return { escrow };
});
