const mongoose = require('mongoose')
const process = require('process')

if (process.argv.length < 5) {
  console.log('Usage: node mongo.js <account> <password> <name> <phonenumber>')
  process.exit(1)
}

const account = process.argv[2]
const password = process.argv[3]
const name = process.argv[4]
const phoneNumber = process.argv[5]

const url = `mongodb+srv://${account}:${password}@cluster0.hrs3q.mongodb.net/?retryWrites=true&w=majority`
const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    const phonebook = new PhoneBook({
      name: name,
      number: phoneNumber,
    })

    return phonebook.save()
  })
  .then(() => {
    console.log('phonenumber saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))