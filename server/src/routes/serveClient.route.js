const express = require('express');
const path = require('path');

const router = express.Router();

const serve = (req, res) => {
  const file = path.join(__dirname, '..', 'client', 'index.html');
  res.sendFile(file);
};

router.get('*', serve);

module.exports = router;
