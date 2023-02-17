const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('a blog can be updated', async () => {
  const blogs = await api.get('/api/blogs')
  const prior = blogs.body[0]
  const response = await api.put(`/api/blogs/${blogs.body[0].id}`).send({likes: blogs.body[0].likes + 1})
  expect(response.statusCode).toBe(200)
  expect(response.body.blog.likes).toBe(prior.likes+1)
})

afterAll(async () => {
  await mongoose.connection.close()
})