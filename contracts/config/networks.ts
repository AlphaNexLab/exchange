import { configVariable } from "hardhat/config";

export const networks = {
  hardhatMainnet: {
    type: "edr-simulated" as const,
    chainType: "l1" as const,
  },
  sepolia: {
    type: "http" as const,
    chainType: "l1" as const,
    url: configVariable("SEPOLIA_RPC_URL"),
    accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
  },
};
