const { registerUser } = require('../services/userService');

async function createUser(req, res) {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: 'Usuario creado' });
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message });
  }
}

module.exports = { createUser };
