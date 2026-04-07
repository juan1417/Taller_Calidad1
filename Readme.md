# Taller: Pruebas de Integración con Jest

## Objetivo
Aplicar pruebas de integración en un backend con Node.js utilizando Jest, implementando mocks, stubs y drivers para simular dependencias y validar el comportamiento del sistema.

---

## Contexto del sistema

Se trabajará con un módulo de registro de usuarios que incluye:

- Validación de datos
- Persistencia en base de datos
- Envío de correo de bienvenida

### Flujo esperado:
1. El cliente envía datos del usuario
2. El sistema guarda el usuario
3. Se envía un correo
4. Se retorna una respuesta HTTP

---

## Punto 1: Prueba de integración con Stubs

### Objetivo
Simular la base de datos sin usar una real.

### Actividad
1. Crear una función `registerUser` en `userService.js`
2. Simular el repositorio (`userRepository`) usando un stub
3. Retornar un usuario falso

### Ejemplo base

```javascript
// userService.js
async function registerUser(userData) {
  const user = await userRepository.save(userData);
  return user;
}
````

```javascript
// test
userRepository.save = jest.fn().mockResolvedValue({
  id: 1,
  email: "test@test.com"
});
```

### Entregable

* Prueba que valide que el usuario es creado correctamente
* Evidencia de uso de stub

---

## Punto 2: Prueba de integración con Mocks

### Objetivo

Simular servicios externos (correo electrónico).

### Actividad

1. Integrar `emailService` en el flujo
2. Mockear el envío de correo con Jest
3. Verificar que el método fue llamado

### Ejemplo

```javascript
jest.mock('../utils/emailService');

await registerUser({ email: "test@test.com" });

expect(emailService.sendWelcomeEmail).toHaveBeenCalled();
```

### Entregable

* Prueba que valide que el correo se envía
* Uso correcto de `jest.mock`

---

## Punto 3: Prueba de integración con Drivers (HTTP)

### Objetivo

Simular una petición real al endpoint.

### Actividad

1. Crear endpoint en Express `/users`
2. Usar `supertest` para simular la petición
3. Integrar mocks y stubs dentro del test

### Ejemplo

```javascript
const request = require('supertest');
const app = require('../app');

test('POST /users', async () => {
  const response = await request(app)
    .post('/users')
    .send({ email: 'test@test.com' });

  expect(response.statusCode).toBe(201);
});
```

### Entregable

* Prueba completa del endpoint
* Validación de respuesta HTTP
* Integración de mocks y stubs

---

## Criterios de evaluación

* Uso correcto de Jest
* Implementación de mocks y stubs
* Simulación de requests con drivers
* Claridad del código
* Buenas prácticas

