const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const offersRoutes = require("./offers.routes");
const tradesRoutes = require("./trades.routes");
const adminRoutes = require("./admin.routes");

async function registerRoutes(app) {
  await app.register(healthRoutes);
  await app.register(authRoutes);
  await app.register(offersRoutes);
  await app.register(tradesRoutes);
  await app.register(adminRoutes);
}

module.exports = { registerRoutes };
