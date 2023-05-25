const router = require('express').Router()
const List = require('../models/list')
const User = require('../models/user')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const newList = await List.create({ ...req.body })
  res.json(newList)
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    if(req.body.read !== true) return
    const user = await User.findByPk(req.decodedToken.id)
    const list = await List.findByPk(req.params.id)
    if(user.id !== list.userId){
      res.status(403).json({ error: 'unauthorized: only list owner can change read status' })
    }
    list.read = true
    await list.save()
    res.json(list)
  } catch(error) {
    next(error)
  }
})

module.exports = router