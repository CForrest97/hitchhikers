const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Logger = require('./utils/Logger');
const errorHandler = require('./middleware/errorHandler');
const analyseRoute = require('./routes/analyse.route');

module.exports = () => {
  const log = new Logger(__filename);
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  // log.logAllApiCalls(app); // call after `app.use(bodyParser)` and before `app.use(router)`

  app.get('/', (req, res) => res.send('hello world'));

  app.use(analyseRoute);

  app.use(errorHandler.handleErrors);
  return app;
};
