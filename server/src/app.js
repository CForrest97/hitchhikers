const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const { addAnalysedQuotesToReq } = require('./middleware/analysedQuotes');
const { handleErrors } = require('./middleware/errorHandler');

const serveClient = require('./routes/serveClient.route');
const analyseRoute = require('./routes/analyse.route');
const moreInfoRoute = require('./routes/moreInfo.route');

module.exports = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(addAnalysedQuotesToReq);
  app.use(express.static(path.join(__dirname, 'client')));

  app.use(analyseRoute);
  app.use(moreInfoRoute);
  app.use(handleErrors);
  app.use(serveClient);
  return app;
};
