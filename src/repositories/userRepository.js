/**
 * Persistencia de usuarios (implementacion real conectaria una base de datos).
 */
async function save(userData) {
  return { id: 1, ...userData };
}

module.exports = { save };
