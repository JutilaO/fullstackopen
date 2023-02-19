const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})
  
router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const user = await User.findById(request.body.userId)
  console.log(request.body.userId)
  blog.user = user._id

  if(!blog.likes) blog.likes = 0
  if(!blog.url || !blog.title) return response.status(400).send({error: 'missing title or url'})
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  
  response.status(201).json(savedBlog)  
})

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findByIdAndUpdate(request.params.id, {likes: body.likes}, {new: true})
  response.json({
    blog
  })
})

module.exports = router