/**
 * Copies compiled P2PEscrow ABI into abi/ for frontend/server consumers.
 * Run after: npm run build
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "../..");

const artifactPath = path.join(
  root,
  "artifacts",
  "src",
  "escrow",
  "P2PEscrow.sol",
  "P2PEscrow.json",
);
const outDir = path.join(root, "abi");
const outPath = path.join(outDir, "P2PEscrow.json");

if (!fs.existsSync(artifactPath)) {
  console.error("Artifact not found. Run `npm run build` first.");
  console.error("Looked at:", artifactPath);
  process.exit(1);
}

const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  outPath,
  JSON.stringify(
    { contractName: artifact.contractName, abi: artifact.abi },
    null,
    2,
  ),
);
console.log("Wrote", outPath);
