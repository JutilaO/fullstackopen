const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
router.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if(!blog.likes) blog.likes = 0
  if(!blog.url || !blog.title) return response.status(400).send({error: 'missing title or url'})
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
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