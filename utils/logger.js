const colors = require('colors/safe');
const config = require('config');

// Reading environment variable values
const COLORS_ENABLED = config.get('colorsEnabled');
const LOG_LEVEL = config.get('logLevel');

// Enabling colors if COLORS_ENABLED is set to 1
if (Number(COLORS_ENABLED) === 1) {
  colors.enable();
} else {
  colors.disable();
}

function logger(moduleName) {
  // Define colors based on the log method
  const colorMap = {
    info: colors.blue,
    warn: colors.yellow,
    error: colors.red,
  };

  return {
    info: (...args) => {
      if (LOG_LEVEL === 'info') {
        console.log(colorMap.info(`${moduleName}:`), ...args);
      }
    },
    warn: (...args) => {
      if (LOG_LEVEL === 'info' || LOG_LEVEL === 'warn') {
        console.warn(colorMap.warn(`${moduleName}:`), ...args);
      }
    },
    error: (...args) => {
      if (LOG_LEVEL === 'info' || LOG_LEVEL === 'warn' || LOG_LEVEL === 'error') {
        console.error(colorMap.error(`${moduleName}:`), ...args);
      }
    },
  };
}

module.exports = logger;
