const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('a blog can be deleted', async () => {
  const blogs = await api.get('/api/blogs')

  const length = async () => {
    const response = await api.get('/api/blogs')
    return response.body.length
  }

  const priorPost = await length()

  const response = await api.delete(`/api/blogs/${blogs.body[0].id}`)
  expect(response.statusCode).toBe(204)

  const afterPost = await length()

  expect(afterPost).toBe(priorPost-1)
})

afterAll(async () => {
  await mongoose.connection.close()
})