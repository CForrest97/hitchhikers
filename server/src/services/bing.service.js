const request = require('request-promise');

const subscriptionKey = process.env.BING_SEARCH_APIKEY;
const endpoint = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search';
const totalNumberOfArticles = 6;

const search = (query) => request({
  method: 'GET',
  uri: endpoint,
  headers: {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
  },
  qs: {
    q: query,
    mkt: 'en-US',
    count: totalNumberOfArticles,
  },
  json: true,
});

const searchForUrls = async (query) => {
  // console.log('[searchForUrls] query');
  // console.log(query);
  const { value: results } = await search(query);
  // console.log('results');
  // console.log(results);
  const summaries = results.map((result) => ({
    url: result.url,
    name: result.name,
    provider: result.provider[0].name,
  }));
  return summaries;
};

module.exports = {
  search,
  searchForUrls,
};
