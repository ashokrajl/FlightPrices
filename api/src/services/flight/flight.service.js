// Initializes the `flight` service on path `/flight`
const { Flight } = require('./flight.class');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/flight', new Flight(options, app));

};
