/**
 * Persistencia de usuarios (implementación real conectaría una base de datos).
 */
async function save(userData) {
  throw new Error('Database not configured');
}

module.exports = { save };
