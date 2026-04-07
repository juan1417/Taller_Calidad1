/**
 * Punto 3: driver HTTP con supertest; mocks y stubs integrados en el test.
 */
jest.mock('../src/utils/emailService', () => ({
  sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../src/repositories/userRepository', () => ({
  save: jest.fn(),
}));

const request = require('supertest');
const app = require('../src/app');
const emailService = require('../src/utils/emailService');
const userRepository = require('../src/repositories/userRepository');

describe('POST /users (supertest)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userRepository.save.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
    });
  });

  it('responde 201, devuelve mensaje y dispara persistencia y correo', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'test@test.com' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: 'Usuario creado' });
    expect(userRepository.save).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(emailService.sendWelcomeEmail).toHaveBeenCalledWith('test@test.com');
  });

  it('responde 400 si falta el email', async () => {
    const response = await request(app).post('/users').send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({ error: 'email is required' });
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
