/**
 * Punto 2: prueba de integración con mock del servicio de correo (jest.mock).
 */
jest.mock('../src/utils/emailService');

jest.mock('../src/userRepository', () => ({
  save: jest.fn().mockResolvedValue({
    id: 1,
    email: 'test@test.com',
  }),
}));

const emailService = require('../src/utils/emailService');
const { registerUser } = require('../src/userService');

describe('registerUser — mock de emailService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    emailService.sendWelcomeEmail.mockResolvedValue(undefined);
  });

  it('envía el correo de bienvenida al registrar', async () => {
    await registerUser({ email: 'test@test.com' });

    expect(emailService.sendWelcomeEmail).toHaveBeenCalledTimes(1);
    expect(emailService.sendWelcomeEmail).toHaveBeenCalledWith('test@test.com');
  });
});
