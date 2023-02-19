const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const config = require('../utils/config')

test('a blog can be deleted', async () => {

  const length = async () => {
    const response = await api.get('/api/blogs').set('Authorization', config.TOKEN)
    return response.body.length
  }

  const priorPost = await length()

  const response = await api.delete('/api/blogs/63f21695fdd27f1588a6736c').set('Authorization', config.TOKEN)
  expect(response.statusCode).toBe(204)

  const afterPost = await length()

  expect(afterPost).toBe(priorPost-1)
})

afterAll(async () => {
  await mongoose.connection.close()
})