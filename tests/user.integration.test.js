const request = require('supertest');
const app = require('../src/app');

describe('POST /users', () => {
  test('Debe crear un usuario', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'test@test.com' });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuario creado');
  });
});
