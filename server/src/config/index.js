/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';

// available levels: ['error', 'warn', 'info', 'debug', 'trace']
/* istanbul ignore next */
const determineLogLevel = (environment) => {
  if (environment === 'production' || environment === 'staging') {
    return 'info';
  }
  return 'debug';
};

const port = 4242;

module.exports = {
  defaultLogLevel: determineLogLevel(env),
  port,
};
