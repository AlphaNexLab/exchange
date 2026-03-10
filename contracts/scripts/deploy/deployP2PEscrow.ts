import { network } from "hardhat";
import { getVerifierAddress } from "../lib/env.js";

const { ethers } = await network.create();

async function main() {
  const verifier = getVerifierAddress();
  const escrow = await ethers.deployContract("P2PEscrow", [verifier]);
  await escrow.waitForDeployment();
  const address = await escrow.getAddress();

  console.log("P2PEscrow deployed to:", address);
  console.log("Verifier:", verifier);
  console.log("Set ESCROW_ADDRESS / NEXT_PUBLIC_ESCROW_ADDRESS to this address.");
  console.log(
    "Optional: write deployments/<network>.json with { \"P2PEscrow\": \"" +
      address +
      "\" }",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
