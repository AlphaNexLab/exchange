const { loadConfig } = require("../config");
const { isChainEnabled } = require("../services/escrow.service");

async function healthRoutes(app) {
  app.get("/health", async () => {
    const { chainId } = loadConfig();
    return {
      ok: true,
      chainEnabled: isChainEnabled(),
      chainId,
    };
  });
}

module.exports = healthRoutes;
