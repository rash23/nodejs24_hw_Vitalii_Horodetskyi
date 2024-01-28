const colors = require('colors/safe');

// Define colors based on the log method
const COLOR_MAP = {
  info: colors.blue,
  warn: colors.yellow,
  error: colors.red,
};

// Define log level priority
const LOG_PRIORITY = {
  info: 1,
  warn: 2,
  error: 3,
};

module.exports = {
  COLOR_MAP,
  LOG_PRIORITY,
};
