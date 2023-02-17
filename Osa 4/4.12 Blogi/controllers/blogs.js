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

module.exports = router