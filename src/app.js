const express = require('express');
const { registerUser } = require('./userService');

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message });
  }
});

module.exports = app;
