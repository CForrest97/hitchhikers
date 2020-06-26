const AnalysedQuotes = require('../modules/analysedQuotes');

const analysedQuotes = new AnalysedQuotes();

const addAnalysedQuotesToReq = (req, res, next) => {
  req.analysedQuotes = analysedQuotes;
  next();
};

module.exports = {
  addAnalysedQuotesToReq,
};
