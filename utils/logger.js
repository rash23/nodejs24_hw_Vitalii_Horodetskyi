const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');
const config = require('config');
const { COLOR_MAP, LOG_PRIORITY } = require('./constants');

// Reading environment variable values
const COLORS_ENABLED = config.get('colorsEnabled');
const currentLogLevel = config.get('logLevel');

// Defining the logs directory
const LOGS_DIRECTORY = path.join('.', 'logs');
const INFO_LOG_FILE = path.join(LOGS_DIRECTORY, 'info.log');
const ERROR_LOG_FILE = path.join(LOGS_DIRECTORY, 'errors.log');

// Enabling colors if COLORS_ENABLED is set to 1
if (Number(COLORS_ENABLED) === 0) {
  colors.disable();
}

// Checking for the logs directory and creating it if it doesn't exist
if (!fs.existsSync(LOGS_DIRECTORY)) {
  fs.mkdirSync(LOGS_DIRECTORY);
}

// Creating write streams for the log files
const infoStream = fs.createWriteStream(path.join(INFO_LOG_FILE), { flags: 'a' });
const errorStream = fs.createWriteStream(path.join(ERROR_LOG_FILE), { flags: 'a' });

function createLogMessage(moduleName, args) {
  return `${new Date().toISOString()} ${moduleName}: ${args.join(' ')}\n`;
}

function logger(moduleName) {
  return {
    // info: works only when `LOG_LEVEL=info`
    info: (...args) => {
      const message = createLogMessage(moduleName, args);
      infoStream.write(message);

      if (LOG_PRIORITY[currentLogLevel] === LOG_PRIORITY.info) {
        console.info(COLOR_MAP.info(`${moduleName}:`), ...args);
      }
    },
    // warn: works when `LOG_LEVEL=info` or `LOG_LEVEL=warn`
    warn: (...args) => {
      const message = createLogMessage(moduleName, args);
      errorStream.write(message);

      if (LOG_PRIORITY[currentLogLevel] < LOG_PRIORITY.error) {
        console.warn(COLOR_MAP.warn(`${moduleName}:`), ...args);
      }
    },
    // error: works always
    error: (...args) => {
      const message = createLogMessage(moduleName, args);
      errorStream.write(message);

      console.error(COLOR_MAP.error(`${moduleName}:`), ...args);
    },
  };
}

process.on('beforeExit', () => {
  infoStream.end();
  errorStream.end();
});

module.exports = logger;
