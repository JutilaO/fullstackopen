const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const Session = require('../models/session')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    if(error.message.includes('Validation isEmail on username failed')) return response.status(400).send({ error: 'username must be a valid email address' })
    if(error.message.includes('year')) return response.status(400).send({ error: 'publication year must be between 1991 and current year' })
    return response.status(400).send({ error: 'malformatted field' })
  }
  if (error.name === 'BlogNonExistant'){
    return response.status(400).send({ error: 'blog not found' })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const rawToken = authorization.substring(7)
      const token = jwt.verify(authorization.substring(7), SECRET)
      const user = await User.findByPk(token.id)
      const session = await Session.findOne({ where: { userId: token.id } })

      if(!session) return res.status(401).json({ error: 'no active session' })
      if(new Date(session.expires) < new Date()){
        session.destroy()
        return res.status(401).json({ error: 'session expired' })
      }
      if(user.disabled === true) return res.status(401).json({ error: 'account disabled' })

      console.log(session.token)
      console.log(rawToken)
      if(session.token !== rawToken) return res.status(401).json({ error: 'session expired 2' })

      req.decodedToken = token
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { errorHandler, tokenExtractor }