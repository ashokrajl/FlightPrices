const session = require('./session/session.service.js');
const flight = require('./flight/flight.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(session);
  app.configure(flight);
};
