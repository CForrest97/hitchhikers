const express = require('express');

const NLUService = require('../services/nlu.watson.service');

const router = express.Router();

const analyse = async (req, res) => {
  const { origin, claim } = req.body;
  console.log(claim);

  try {
    const score = await NLUService.analyse(claim);
    console.log(claim, score);
    return res.send({ score });
  } catch (err) {
    console.log(err.body);
    return res.send({ score: -1 });
  }
};

router.post('/analyse', analyse);

module.exports = router;
