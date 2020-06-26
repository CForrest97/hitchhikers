const express = require('express');

const router = express.Router();

const getMoreInfo = async (req, res) => {
  const { analysedQuotes } = req;
  const { claimID } = req.params;
  const claim = analysedQuotes.get(claimID);
  return res.send(claim);
};

router.get('/api/find-out-more/:claimID', getMoreInfo);

module.exports = router;
