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

const analyse = async (text, origin) => {
  const log = new Logger(`${path.basename(__filename)}] [${text.split(' ').slice(0, 3).join(' ')}...`);
  try {
    const {
      documentSentiment,
      keywords,
    } = await analyseText(text);

    const searchQuery = keywords.join(' ');
    const searchResults = await searchForUrls(searchQuery);

    const sourcesFor = [];
    const sourcesAgainst = [];
    const promises = searchResults.map(async (result) => {
      const { url } = result;
      if (url === origin) {
        // ignore result if it is the original claim
        return;
      }
      try {
        const resultSentiment = await analyseUrl(url);
        if (resultSentiment !== documentSentiment) {
          sourcesFor.push(result);
        } else if (!['positive', 'negative'].includes(resultSentiment)) {
          log.warn(`resultSentiment (${resultSentiment}) was neither positive nor negative.    (url: ${url})`);
        } else {
          sourcesAgainst.push(result);
        }
      } catch (error) {
        log.warn(`[${JSON.parse(error.body).code}] ${error.message}.    (url: ${url})`);
      }
    });
    await Promise.all(promises);

    // console.log('sourcesFor', sourcesFor);
    const numResults = sourcesFor.length + sourcesAgainst.length;
    if (!numResults) {
      log.warn(`numResults: ${numResults}`);
    }

    const pctAgree = (Math.round((sourcesFor.length / numResults) * 100)).toFixed(2);

    return {
      pctAgree,
      searchResults: {
        for: sourcesFor,
        against: sourcesAgainst,
      },
      searchQuery,
      claim: text,
    };
  } catch (error) {
    if (error.statusCode && error.message) {
      log.error(`[Status Code: ${error.statusCode}] ${error.message}`);
    } else {
      log.error(error);
    }
    return {
      pctAgree: -1,
      claim: text,
    };
  }
};

module.exports = {
  analyse,
  analyseUrl,
};
