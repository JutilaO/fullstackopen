const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
  expect(response.type).toBe('application/json')
})

afterAll(async () => {
  await mongoose.connection.close()
})