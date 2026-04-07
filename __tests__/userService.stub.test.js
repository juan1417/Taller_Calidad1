/**
 * Punto 1: prueba de integración con stub del repositorio (sin base de datos real).
 */
jest.mock('../src/utils/emailService', () => ({
  sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
}));

const userRepository = require('../src/userRepository');
const { registerUser } = require('../src/userService');

describe('registerUser — stub de userRepository', () => {
  beforeEach(() => {
    // Stub: respuesta fija sin persistencia real
    userRepository.save = jest.fn().mockResolvedValue({
      id: 1,
      email: 'test@test.com',
    });
  });

  it('crea el usuario correctamente usando el stub del repositorio', async () => {
    const userData = { email: 'test@test.com', name: 'Test User' };
    const user = await registerUser(userData);

    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toHaveBeenCalledWith(userData);
    expect(user).toEqual({
      id: 1,
      email: 'test@test.com',
    });
  });
});
