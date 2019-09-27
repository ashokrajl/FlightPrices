/* eslint-disable no-unused-vars */
const rp = require('request-promise');
const cache = require('memory-cache');
const moment = require('moment');

exports.Flight = class Flight {
  constructor(options) {
    this.options = options || {};
    this.origin = 'SFO-sky';
    this.destination = 'JFK-sky';
    this.headers = {
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
      'x-rapidapi-key': 'e03b4cfe10msh039fc06c7e6c488p1607d8jsnab083507b767'
    };
  }

  async find(params) {
    try {
      let sessionKey = cache.get('sessionKey') || await this.getSessionKey();
      let isStatuscomplete = false;

      if (params.query.origin) {
        this.origin = params.query.origin;
      }
      if (params.query.destination) {
        this.destination = params.query.destination;
      }

      while (!isStatuscomplete) {
        isStatuscomplete = await this.checkUpdateStatus(sessionKey);
      }
      return this.getFareForMonth();
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getSessionKey() {
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
      cache.clear();
      throw new Error(error);
    }
  }

  async checkUpdateStatus(sessionKey) {
    try {
      var options = {
        method: 'GET',
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${sessionKey}`,
        qs: { pageIndex: '0', pageSize: '10' },
        headers: this.headers
      };
      const data = await rp(options);
      const parsedJson = JSON.parse(data);
      
      return parsedJson.Status === 'UpdatesComplete';
    }
    catch (error) {
      console.log('error',error);
      this.find();
      throw new Error(error);
    }
  }
  async getFareForMonth() {
    const requestPromises = [];
    for (let i = 0; i < 31; i++) {
      const date = moment().add(i, 'days').format('YYYY-MM-DD');
      requestPromises.push(this.getFareForDay(date));
    }

    return Promise.all(requestPromises);
  }
  async getFareForDay(date) {
    try {
      var options = {
        method: 'GET',
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${this.origin}/${this.destination}/${date}`,
        qs: { inboundpartialdate: '2019-12-01' },
        headers: this.headers
      };

      const data = await rp(options);
      const parsedJson = JSON.parse(data);

      return parsedJson.Quotes.shift();
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
