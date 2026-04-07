const userRepository = require('./userRepository');
const emailService = require('./utils/emailService');

function validateUserData(userData) {
  if (!userData || typeof userData.email !== 'string' || !userData.email.trim()) {
    const err = new Error('email is required');
    err.statusCode = 400;
    throw err;
  }
}

async function registerUser(userData) {
  validateUserData(userData);
  const user = await userRepository.save(userData);
  await emailService.sendWelcomeEmail(user.email);
  return user;
}

module.exports = { registerUser, validateUserData };
