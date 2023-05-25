const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {

  const where = {}

  if(req.query.read) {
    where.read = req.query.read
  }

  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ['userId']
    },
    include: [
      {
        model: Blog,
        as: 'readlist',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['read', 'blogId'],
          where
        },
      }
    ]
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if(user){
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router