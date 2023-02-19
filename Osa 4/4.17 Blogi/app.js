const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())
app.use('/api/blogs', router)
app.use('/api/users', usersRouter)


module.exports = app