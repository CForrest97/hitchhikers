const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req, res) => res.send('hello world'));
  app.post('/analyse', (req, res) => {
    const { origin } = req.body;

    if (origin.includes('bbc')) {
      res.send({ score: 100 });
    } else if (origin.includes('facebook')) {
      res.send({ score: 0 });
    } else if (origin.includes('twitter')) {
      res.send({ score: 78 });
    }
  });
  return app;
};
