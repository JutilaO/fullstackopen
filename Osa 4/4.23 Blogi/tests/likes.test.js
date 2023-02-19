const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const config = require('../utils/config')

describe('everything to do with likes', () => {

  const blogs = [
    {_id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0},
    {_id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0},
    {_id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0},
    {_id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0},
    {_id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0},
    {_id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0}  
  ]

  test('favorite blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,})
  })

  test('blog has likes', async () => {
    const blog = {
      title: 'A blog',
      author: 'Me',
      url: 'https:/blog/blog/blog.com'
    }

    const post = await api.post('/api/blogs').set('Authorization', config.TOKEN).send(blog)
    expect(post.statusCode).toBe(201)
    expect(post.body.likes).toBeDefined()
  })

  test('author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 12})
  })

  test('count likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })


  afterAll(async () => {
    await mongoose.connection.close()
  })

})