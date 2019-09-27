/* eslint-disable no-unused-vars */
const rp = require('request-promise');
const cache = require('memory-cache');
exports.Session = class Session {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    try {
      var options = {
        method: 'POST',
        resolveWithFullResponse: true,
        url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0',
        headers: {
          'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key': 'e03b4cfe10msh039fc06c7e6c488p1607d8jsnab083507b767',
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
          inboundDate: '2019-10-30',
          cabinClass: 'business',
          children: '0',
          infants: '0',
          country: 'US',
          currency: 'USD',
          locale: 'en-US',
          originPlace: 'SFO-sky',
          destinationPlace: 'LHR-sky',
          outboundDate: '2019-10-01',
          adults: '1'
        }
      };

      const data = await rp(options);
      const sessionKeyString = data.headers.location.split('/').pop();
      const sessionKey = sessionKeyString.replace(/['"]+/g, '');
      cache.put('sessionKey', sessionKey);

      return sessionKey;
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
