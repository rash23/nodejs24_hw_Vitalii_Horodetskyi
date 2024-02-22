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

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

module.exports = {
  COLOR_MAP,
  LOG_PRIORITY,
  HTTP_STATUS_CODES,
};
