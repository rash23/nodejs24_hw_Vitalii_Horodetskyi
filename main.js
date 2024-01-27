require('dotenv').config();

const logger = require('./utils/logger')('main');

logger.info('the script is running!');
logger.warn('warning!');
logger.error('error!');
