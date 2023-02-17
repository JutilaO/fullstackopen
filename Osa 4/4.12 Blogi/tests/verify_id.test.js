const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('id is defined', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})