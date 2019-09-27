// Initializes the `session` service on path `/session`
const { Session } = require('./session.class');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/session', new Session(options, app));

};
