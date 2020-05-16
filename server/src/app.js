const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const analyseRoute = require('./routes/analyse.route');

module.exports = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req, res) => res.send('hello world'));

  app.use(analyseRoute);

  return app;
};
