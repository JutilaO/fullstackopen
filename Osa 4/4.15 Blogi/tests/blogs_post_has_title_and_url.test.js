const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog has title and url', async () => {
  const blog = {
    //title: 'A blog',
    author: 'Me'
    //url: 'https:/blog/blog/blog.com'
  }

  const post = await api.post('/api/blogs').send(blog)
  expect(post.statusCode).toBe(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})