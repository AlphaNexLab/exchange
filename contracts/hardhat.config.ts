import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { defineConfig } from "hardhat/config";
import { networks } from "./config/networks.js";
import { solidity } from "./config/solidity.js";

export default defineConfig({
  plugins: [hardhatToolboxMochaEthersPlugin],
  paths: {
    sources: "./src",
    tests: "./test",
    scripts: "./scripts",
  },
  solidity,
  networks,
});
