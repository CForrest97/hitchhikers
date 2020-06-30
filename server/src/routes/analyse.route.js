const express = require('express');
const path = require('path');

const Logger = require('../utils/Logger');
const NLUService = require('../services/nlu.watson.service');

const router = express.Router();

const analyse = async (req, res) => {
  const { analysedQuotes } = req;
  const { claim, origin } = req.body;
  const log = new Logger(`${path.basename(__filename)}] [${claim.split(' ').slice(0, 3).join(' ')}...`);

  log.debug('received claim');
  const cachedResultID = analysedQuotes.findIDFromTitle(claim);
  if (cachedResultID) {
    const cachedResult = analysedQuotes.get(cachedResultID);
    log.debug('Using cache');
    log.info(cachedResult.pctAgree);
    return res.send({ ...cachedResult, claimID: cachedResultID });
  }

  const result = await NLUService.analyse(claim, origin);
  log.info(result.pctAgree);
  let claimID = '-1';
  // Guard against caching failed claims
  if (result.pctAgree >= 0) {
    claimID = analysedQuotes.add(result);
  }
  return res.send({ ...result, claimID });
};

router.post('/analyse', analyse);

module.exports = router;
