const router = require('express').Router();

const { validateBody, validateUserId } = require('./validators');
const { HTTP_STATUS_CODES } = require('../../utils/constants');

const knexLib = require('knex');

const knexConfig = require('../../knexfile');
const knex = knexLib(knexConfig);

// Get all users
router.get('/', async (req, resp) => {
  const users = await knex.select().from('users');

  resp.json(users);
});

// Create a new user
router.post('/', validateBody, async (req, resp) => {
  const [user] = await knex('users').insert(req.body).returning('*');
  console.log('user', user);

  resp.status(HTTP_STATUS_CODES.CREATED).json(user);
});

// Get user by ID
router.get('/:userId', validateUserId, async (req, resp) => {
  const userId = parseInt(req.params.userId);

  const user = await knex.select().from('users').where({ id: userId }).first();

  if (!user) {
    return resp.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: 'User not found' });
  }

  resp.json(user);
});

// Delete user by ID
router.delete('/:userId', validateUserId, async (req, resp) => {
  const userId = parseInt(req.params.userId);

  // Delete the user from the database
  const deletedCount = await knex('users').where({ id: userId }).del();

  if (deletedCount === 0) {
    return resp.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: 'User not found' });
  }

  resp.status(HTTP_STATUS_CODES.OK).json({ message: 'User deleted successfully' });
});

module.exports = {
  router,
};
