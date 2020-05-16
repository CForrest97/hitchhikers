const path = require('path');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const Logger = require('../utils/Logger');
const { searchForUrls } = require('./bing.service');

const apikey = process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY;
const NLU_URL = process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL;

const nlu = new NaturalLanguageUnderstandingV1({
  version: '2020-03-10',
  authenticator: new IamAuthenticator({ apikey }),
  url: NLU_URL,
});

const analyseText = async (text) => {
  const analyzeParams = {
    text,
    features: {
      sentiment: {
        targets: undefined,
      },
      keywords: {
        // sentiment: true,
        // emotion: true,
        limit: 3,
      },
    },
  };
  const { result } = await nlu.analyze(analyzeParams);
  // console.log('result');
  // console.log(result);
  const documentSentiment = result.sentiment.document.label;
  const keywords = result.keywords.map((k) => k.text);
  return {
    documentSentiment,
    keywords,
  };
};

const analyseUrl = async (url) => {
  const analyzeParams = {
    url,
    features: {
      sentiment: {
        targets: undefined,
      },
    },
  };
  const { result } = await nlu.analyze(analyzeParams);
  // console.log('[analyseUrl] result.sentiment');
  // console.log(result.sentiment, url);
  return result.sentiment.document.label;
};

const analyse = async (text) => {
  const log = new Logger(`${path.basename(__filename)}] [${text.split(' ').slice(0, 3).join(' ')}...`);
  const {
    documentSentiment,
    keywords,
  } = await analyseText(text);

  const searchQuery = keywords.join(' ');
  const searchResults = await searchForUrls(searchQuery);
  // console.log('searchResults', searchResults, searchResults.length);

  let numAgreements = 0;
  let numDisagreements = 0;
  const promises = searchResults.map(async (url) => {
    try {
      const resultSentiment = await analyseUrl(url);
      if (resultSentiment !== documentSentiment) {
        numAgreements += 1;
      } else if (!['positive', 'negative'].includes(resultSentiment)) {
        log.warn(`resultSentiment (${resultSentiment}) was neither positive nor negative.    (url: ${url})`);
      } else {
        numDisagreements += 1;
      }
    } catch (err) {
      log.error(`[${JSON.parse(err.body).code}] ${err.message}.    (url: ${url})`);
    }
  });
  await Promise.all(promises);

  // console.log('numAgreements', numAgreements);
  const numResults = numAgreements + numDisagreements;
  const pctAgree = numAgreements / numResults;

  return {
    pctAgree: pctAgree * 100,
    searchResults,
    searchQuery,
  };
};

module.exports = {
  analyse,
};
