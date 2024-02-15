require('dotenv').config();
const { createServer } = require('http');
const logger = require('./utils/logger')('server');
const config = require('config');
const { HTTP_STATUS_CODES } = require('./utils/constants');

const PORT = config.get('port');

const handleHealthCheck = (req, res) => {
  res.statusCode = HTTP_STATUS_CODES.OK;

  const message = `${req.method} ${req.url} ${res.statusCode}`;
  logger.info(message);

  res.end('healthcheck passed');
};

const handleNotFound = (req, res) => {
  res.statusCode = HTTP_STATUS_CODES.NOT_FOUND;

  const message = `${req.method} ${req.url} ${res.statusCode}`;
  logger.warn(message);

  res.end('404 Not Found');
};

const server = createServer((req, res) => {
  if (req.url === '/healthcheck' && req.method === 'GET') {
    handleHealthCheck(req, res);

    return;
  }

  handleNotFound(req, res);
});

server.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});

module.exports = server;
