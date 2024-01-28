const colors = require('colors/safe');
const config = require('config');
const { COLOR_MAP, LOG_PRIORITY } = require('./constants');

// Reading environment variable values
const COLORS_ENABLED = config.get('colorsEnabled');
const currentLogLevel = config.get('logLevel');

// Enabling colors if COLORS_ENABLED is set to 1
if (Number(COLORS_ENABLED) === 0) {
  colors.disable();
}

function logger(moduleName) {
  return {
    // info: works only when `LOG_LEVEL=info`
    info: (...args) => {
      if (LOG_PRIORITY[currentLogLevel] === LOG_PRIORITY.info) {
        console.info(COLOR_MAP.info(`${moduleName}:`), ...args);
      }
    },
    // warn: works when `LOG_LEVEL=info` or `LOG_LEVEL=warn`
    warn: (...args) => {
      if (LOG_PRIORITY[currentLogLevel] < LOG_PRIORITY.error) {
        console.warn(COLOR_MAP.warn(`${moduleName}:`), ...args);
      }
    },
    // error: works always
    error: (...args) => {
      console.error(COLOR_MAP.error(`${moduleName}:`), ...args);
    },
  };
}

module.exports = logger;
