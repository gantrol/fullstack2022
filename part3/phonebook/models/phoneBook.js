const mongoose = require('mongoose')
const process = require('process')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (v) => {
        // https://regex-vis.com/?r=%2F%5Cd%7B2%2C3%7D-%5Cd%7B7%2C8%7D%2F
        return /\d{2,3}-\d{5,9}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
})

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('PhoneBook', phoneBookSchema)