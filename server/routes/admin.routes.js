const { requireVerifier } = require("../middleware/auth");
const tradesService = require("../services/trades.service");

async function adminRoutes(app) {
  app.post("/admin/trades/:id/verify", async (request) => {
    requireVerifier(request);
    return tradesService.verifyTrade(request.params.id);
  });

  app.post("/admin/trades/:id/refund", async (request) => {
    requireVerifier(request);
    return tradesService.refundTrade(request.params.id);
  });
}

module.exports = adminRoutes;
