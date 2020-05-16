const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const apikey = process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY;
const url = process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL;

const nlu = new NaturalLanguageUnderstandingV1({
  version: '2020-03-10',
  authenticator: new IamAuthenticator({ apikey }),
  url,
});

const analyse = async (claim) => {
  const analyzeParams = {
    text: claim,
    // html: url,
    features: {
      sentiment: {
        targets: [
          'California',
        ],
      },
    },
  };
  const results = await nlu.analyze(analyzeParams);
  console.log('results.result');
  console.log(results.result);
  return { score: results.result.sentiment.document.score };

  // if (origin.includes('bbc')) {
  //   return { score: 100 };
  // } else if (origin.includes('facebook')) {
  //   return { score: 0 };
  // } else if (origin.includes('twitter')) {
  //   return { score: 78 };
  // } else {
  //   return { error: 'unknown origin' };
  // }
};

module.exports = {
  analyse,
};
