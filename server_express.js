const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('config');
const { router: usersRouter } = require('./routes/users/users');

// Retrieve port from configuration
const PORT = config.get('port');

// Define directory for storing logs
const LOGS_DIRECTORY = path.join(__dirname, 'logs');

// Check if logs directory exists, if not, create it
if (!fs.existsSync(LOGS_DIRECTORY)) {
  fs.mkdirSync(LOGS_DIRECTORY);
}

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(path.join(LOGS_DIRECTORY, 'access.log'), { flags: 'a' });

// Create Express application
const app = express();

// Middleware for logging HTTP requests
app.use(morgan('dev'));
app.use(morgan(':date[iso] :method :url :status', { stream: accessLogStream }));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Mount the users router at the /users endpoint
app.use('/users', usersRouter);

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
