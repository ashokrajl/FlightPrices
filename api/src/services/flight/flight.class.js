/* eslint-disable no-unused-vars */
const rp = require('request-promise');
const cache = require('memory-cache');
const moment = require('moment');

exports.Flight = class Flight {
  constructor(options) {
    this.options = options || {};
    this.headers = {
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
      'x-rapidapi-key': 'e03b4cfe10msh039fc06c7e6c488p1607d8jsnab083507b767'
    };
  }

  async find(params) {
    let isStatuscomplete = false;
    while (!isStatuscomplete) {
      isStatuscomplete = await this.checkUpdateStatus();
    }
    return this.getFareForMonth();
  }

  async checkUpdateStatus() {
    try {
      const sessionKey = cache.get('sessionKey');
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
      console.log(error);
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
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/${date}`,
        qs: { inboundpartialdate: '2019-12-01' },
        headers: this.headers
      };

      const data = await rp(options);
      const parsedJson = JSON.parse(data);

      return parsedJson.Quotes[0];
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
