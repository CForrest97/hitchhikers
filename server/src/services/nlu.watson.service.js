const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
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
  const {
    documentSentiment,
    keywords,
  } = await analyseText(text);

  const searchResults = await searchForUrls(keywords.join(' '));
  // console.log('searchResults', searchResults, searchResults.length);


  let numAgreements = 0;

  const promises = searchResults.map(async (url) => {
    try {
      const resultSentiment = await analyseUrl(url);
      if (resultSentiment !== documentSentiment) {
        numAgreements += 1;
      }
    } catch (err) {
      console.log(err, url);
    }
  });
  await Promise.all(promises);

  // console.log('numAgreements', numAgreements);

  const numSearchResults = searchResults.length;
  const pctAgree = numAgreements / numSearchResults;

  return pctAgree * 100;
};

module.exports = {
  analyse,
};
