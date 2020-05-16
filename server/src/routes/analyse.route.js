const express = require('express');
const path = require('path');

const Logger = require('../utils/Logger');
const NLUService = require('../services/nlu.watson.service');

const router = express.Router();

const analyse = async (req, res) => {
  const { origin, claim } = req.body;
  const log = new Logger(`${path.basename(__filename)}] [${claim.split(' ').slice(0, 3).join(' ')}...`);

  log.debug('received claim');
  try {
    const result = await NLUService.analyse(claim);
    log.info(result.pctAgree);
    return res.send(result);
  } catch (err) {
    log.error(err.body);
    return res.send({ pctAgree: -1 });
  }
};

router.post('/analyse', analyse);

module.exports = router;
