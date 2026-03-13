const { requireAddress } = require("../middleware/auth");
const offersService = require("../services/offers.service");

async function offersRoutes(app) {
  app.get("/offers", async () => ({
    offers: offersService.listPublicOffers(),
  }));

  app.get("/offers/:id", async (request) => ({
    offer: offersService.getPublicOffer(request.params.id),
  }));

  app.post("/offers", async (request, reply) => {
    const seller = requireAddress(request);
    const offer = offersService.createPublicOffer(seller, request.body || {});
    return reply.code(201).send({ offer });
  });
}

module.exports = offersRoutes;
