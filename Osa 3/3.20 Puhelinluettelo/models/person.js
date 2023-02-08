const mongoose = require('mongoose')


const url = ""

mongoose.set('strictQuery', false)
mongoose.connect(url)

function validator(value){
    return /^\d{2}-{1}/.test(value) || /^\d{3}-{1}/.test(value)
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: [validator, "Phone number not valid"]
    },
})
  
const Person = mongoose.model('Person', personSchema)

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})

module.exports = mongoose.model("Person", personSchema)