const offersRepository = require("./offers.repository");
const tradesRepository = require("./trades.repository");
const sessionsRepository = require("./sessions.repository");

module.exports = {
  ...offersRepository,
  ...tradesRepository,
  ...sessionsRepository,
};
