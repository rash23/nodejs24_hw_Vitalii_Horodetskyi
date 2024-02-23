const router = require('express').Router();
const fs = require('fs');
const { validateBody, validateUserId } = require('./validators');
const { HTTP_STATUS_CODES } = require('../../utils/constants');

const USERS_FILE_PATH = './data/users.json';

let users = [];

try {
  const userData = fs.readFileSync(USERS_FILE_PATH, 'utf8');
  users = JSON.parse(userData);
  console.log('List of users loaded from file:', users);
} catch (error) {
  console.error('Error loading list of users from file:', error);
}

// Get all users
router.get('/', (req, resp) => {
  resp.json(users);
});

// Create a new user
router.post('/', validateBody, (req, resp) => {
  const { username, email } = req.body;
  const newUser = { id: users.length + 1, username, email };

  users.push(newUser);

  resp.status(HTTP_STATUS_CODES.CREATED).json(newUser);
});

// Get user by ID
router.get('/:userId', validateUserId, (req, resp) => {
  const userId = parseInt(req.params.userId);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return resp.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: 'User not found' });
  }
  resp.json(user);
});

// Delete user by ID
router.delete('/:userId', validateUserId, (req, resp) => {
  const userId = parseInt(req.params.userId);

  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return resp.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(index, 1)[0]; // Remove and get the deleted user
  resp.status(HTTP_STATUS_CODES.OK).json(deletedUser);
});

// Save user data to file when the server is stopped
process.on('SIGINT', () => {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users), 'utf8');
  console.log('User data saved to file:', users);
});

module.exports = {
  router,
};
