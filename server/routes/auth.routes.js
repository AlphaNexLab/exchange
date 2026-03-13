const authService = require("../services/auth.service");
const { getBearerToken, requireAddress } = require("../middleware/auth");

async function authRoutes(app) {
  app.get("/auth/nonce", async (request) => {
    const address = request.query && request.query.address;
    return authService.getNonce(address);
  });

  app.post("/auth/verify", async (request) => {
    const body = request.body || {};
    return authService.verifySiwe({
      message: body.message,
      signature: body.signature,
    });
  });

  app.get("/auth/me", async (request) => {
    requireAddress(request);
    return authService.me(getBearerToken(request));
  });

  app.post("/auth/logout", async (request) => {
    return authService.logout(getBearerToken(request));
  });
}

module.exports = authRoutes;
