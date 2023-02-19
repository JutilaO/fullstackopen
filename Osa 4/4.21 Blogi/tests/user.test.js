const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


const getUsers = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

describe('one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creating user works', async () => {
    const prior = await getUsers()

    const newUser = {
      username: 'mestari',
      name: 'Kaytta Janne',
      password: '1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const after = await getUsers()
    expect(after).toHaveLength(prior.length + 1)

    const usernames = after.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })


  test('user creation fails properly if username is taken', async () => {
    const prior = await getUsers()

    const newUser = {
      username: 'root',
      name: 'Ville Tapio',
      password: 'root',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const after = await getUsers()
    expect(after).toHaveLength(prior.length)
  })

  test('user creation fails properly if username or password is invalid', async () => {
    const prior = await getUsers()

    const newUser = {
      username: '',
      name: 'Ville Tapio',
      password: '',
    }

    const result = await api.post('/api/users').send(newUser)
    
    expect(result.statusCode).toBe(400)
    expect(result.body.error).toContain('invalid user: username or password too short')

    const after = await getUsers()
    expect(after).toHaveLength(prior.length)
  })

})