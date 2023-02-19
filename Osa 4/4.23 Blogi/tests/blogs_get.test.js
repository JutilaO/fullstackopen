const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const config = require('../utils/config')

describe('get functions', () => {
  test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs').set('Authorization', config.TOKEN)
    //expect(response.body).toHaveLength(4)
    expect(response.type).toBe('application/json')
  })

  test('id is defined', async () => {
    const response = await api.get('/api/blogs').set('Authorization', config.TOKEN)
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})