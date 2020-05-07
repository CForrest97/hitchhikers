const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req, res) => res.send('hello world'));
  app.post('/analyse', (req, res) => {
    console.log(req.body);
    res.send({ score: Math.round(Math.random() * 100) });
  });
  return app;
};
