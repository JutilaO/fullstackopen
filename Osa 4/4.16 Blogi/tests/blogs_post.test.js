const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs can be added', async () => {
  const blog = {
    title: 'A blog',
    author: 'Me',
    url: 'https:/blog/blog/blog.com'
  }

  const length = async () => {
    const response = await api.get('/api/blogs')
    return response.body.length
  }

  const priorPost = await length()

  const post = await api.post('/api/blogs').send(blog)
  expect(post.statusCode).toBe(201)

  const afterPost = await length()

  expect(afterPost).toBe(priorPost+1)
})

afterAll(async () => {
  await mongoose.connection.close()
})