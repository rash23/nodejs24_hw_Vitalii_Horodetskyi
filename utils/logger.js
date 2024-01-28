const colors = require('colors/safe');
const config = require('config');
const { COLOR_MAP, LOG_LEVEL_PRIORITY } = require('./constants');

// Reading environment variable values
const COLORS_ENABLED = config.get('colorsEnabled');
const LOG_LEVEL = config.get('logLevel');

// Enabling colors if COLORS_ENABLED is set to 1
if (Number(COLORS_ENABLED) === 0) {
  colors.disable();
}

function logger(moduleName) {
  return {
    info: (...args) => {
      if (LOG_LEVEL_PRIORITY.info >= LOG_LEVEL_PRIORITY[LOG_LEVEL]) {
        console.info(COLOR_MAP.info(`${moduleName}:`), ...args);
      }
    },
    warn: (...args) => {
      if (LOG_LEVEL_PRIORITY.warn >= LOG_LEVEL_PRIORITY[LOG_LEVEL]) {
        console.warn(COLOR_MAP.warn(`${moduleName}:`), ...args);
      }
    },
    error: (...args) => {
      if (LOG_LEVEL_PRIORITY.error >= LOG_LEVEL_PRIORITY[LOG_LEVEL]) {
        console.error(COLOR_MAP.error(`${moduleName}:`), ...args);
      }
    },
  };
}

module.exports = logger;
