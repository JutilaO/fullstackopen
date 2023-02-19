require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXIiLCJpZCI6IjYzZjIxNzUwMDJkNzEwNjY1NjI5MDcyMCIsImlhdCI6MTY3NjgxMDA2OX0.rHfQp_vKE5YYS5Vz4O_vEx4ATEDuPWzEGfQUsipD4lU'

module.exports = {
  MONGODB_URI,
  PORT,
  TOKEN
}