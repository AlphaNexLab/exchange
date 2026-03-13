function registerErrorHandler(app) {
  app.setErrorHandler((error, _request, reply) => {
    const status = error.statusCode || 500;
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    if (status >= 500) app.log.error(error);
    reply.code(status).send({ error: message });
  });
}

module.exports = { registerErrorHandler };
