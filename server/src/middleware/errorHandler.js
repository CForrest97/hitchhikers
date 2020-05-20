const Logger = require('../utils/Logger');

const log = new Logger(__filename);

const handleErrors = (error, req, res, next) => {
  log.error(error);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({ error: error.message });
};

module.exports = {
  handleErrors,
};
