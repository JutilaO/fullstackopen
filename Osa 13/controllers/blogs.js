const router = require('express').Router()
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')
const { Op } = require('sequelize')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {

  const where = {}

  if(req.query.search) {
    where[Op.or] = [
      {
        title: { [Op.iLike]: '%'+req.query.search+'%' }
      },
      {
        author: { [Op.iLike]: '%'+req.query.search+'%' }
      }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    next({ name: 'BlogNonExistant', message: 'blog not found' })
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    res.json(blog)
  } catch(error) {
    next(error)
  }
})

router.delete('/:id', [blogFinder, tokenExtractor], async (req, res, next) => {
  if (req.blog) {
    const user = await User.findByPk(req.decodedToken.id)
    if(req.blog.userId !== user.id){
      return res.status(403).json({ error: 'unauthorized: only blog creator can delete the blog' })
    }
    await req.blog.destroy()
  } else {
    next({ name: 'BlogNonExistant', message: 'blog not found' })
  }
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    next({ name: 'BlogNonExistant', message: 'blog not found' })
  }
})

module.exports = router