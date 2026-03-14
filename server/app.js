const Fastify = require("fastify");
const cors = require("@fastify/cors");
const { loadConfig } = require("./config");
const { registerErrorHandler } = require("./middleware/error-handler");
const { registerRoutes } = require("./routes");

async function buildApp() {
  const { corsOrigin } = loadConfig();
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: corsOrigin,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-verifier-key"],
  });

  registerErrorHandler(app);
  await registerRoutes(app);

  return app;
}

module.exports = { buildApp };
