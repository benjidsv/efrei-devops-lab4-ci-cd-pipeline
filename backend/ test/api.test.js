const request = require('supertest');
const express = require('express');

const app = express();
app.get('/api/message', (req, res) => res.json({ message: 'Hello from the backend!' }));

test('GET /api/message returns message', async () => {
  const res = await request(app).get('/api/message');
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Hello from the backend!');
});
