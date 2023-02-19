const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const config = require('../utils/config')

describe('blogs can be added', () => {
  test('blogs can be added', async () => {
    const blog = {
      title: 'A blog',
      author: 'Me',
      url: 'https:/blog/blog/blog.com'
    }
  
    const length = async () => {
      const response = await api.get('/api/blogs').set('Authorization', config.TOKEN)
      return response.body.length
    }
  
    const priorPost = await length()
  
    await api
      .post('/api/blogs')
      .set('Authorization', config.TOKEN)
      .send(blog)
      .expect(201)
  
  
    const afterPost = await length()
    expect(afterPost).toBe(priorPost+1)
  })


  test('blogs cant be added with invalid token', async () => {
    const blog = {
      title: 'A blog',
      author: 'Me',
      url: 'https:/blog/blog/blog.com'
    }
  
    const length = async () => {
      const response = await api.get('/api/blogs').set('Authorization', config.TOKEN)
      return response.body.length
    }
  
    const priorPost = await length()
  
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
  
  
    const afterPost = await length()
    expect(afterPost).toBe(priorPost)
  })


  test('blog has title and url', async () => {
    const blog = {
      author: 'Me'
    }
  
    const post = await api.post('/api/blogs').set('Authorization', config.TOKEN).send(blog)
    expect(post.statusCode).toBe(400)
  })


})

afterAll(async () => {
  await mongoose.connection.close()
})