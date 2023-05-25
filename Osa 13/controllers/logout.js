const router = require('express').Router()
const Session = require('../models/session')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  const session = await Session.destroy({ where: { userId: req.decodedToken.id } })
  if(!session) return res.json({ error: 'no session' })
  req.decodedToken = {}
  res.status(200).end()
})

module.exports = router