const request = require('request-promise');

const subscriptionKey = process.env.BING_SUBSCRIPTION_KEY;
const endpoint = `${process.env.BING_ENDPOINT}/bing/v7.0/news/search`;

const search = (query) => request({
  method: 'GET',
  uri: endpoint,
  headers: {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
  },
  qs: {
    q: query,
    mkt: 'en-US',
  },
  json: true,
});

module.exports = {
  search,
};
