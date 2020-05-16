const express = require('express');

const NLUService = require('../services/nlu.watson.service');

const router = express.Router();

const analyse = async (req, res) => {
  const { origin, claim } = req.body;
  console.log(req.body);

  const result = await NLUService.analyse(claim);

  return res.send(result);
};

router.post('/analyse', analyse);

module.exports = router;
