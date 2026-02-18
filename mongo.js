/**
 * Command-line tool for phonebook MongoDB.
 * Do not commit .env or put the real password in this file.
 *
 * List all:  node mongo.js <password>
 * Add one:   node mongo.js <password> <name> <number>
 * Example:  node mongo.js yourpassword "Arto Vihavainen" 045-1232456
 */

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [name] [number]')
  console.log('  List all: node mongo.js <password>')
  console.log('  Add one:  node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

// Build URI: use MONGODB_URI from .env and replace password, or use MONGODB_CLUSTER
require('dotenv').config()
let url = process.env.MONGODB_URI
if (!url) {
  const cluster = process.env.MONGODB_CLUSTER || 'cluster0.xxxxx.mongodb.net'
  url = `mongodb+srv://fullstack:${password}@${cluster}/phonebook?retryWrites=true&w=majority&appName=Cluster0`
} else {
  url = url.replace(/:([^:@]+)@/, `:${password}@`)
}
process.env.MONGODB_URI = url

const mongoose = require('mongoose')
const Person = require('./models/person')

if (process.argv.length === 3) {
  Person.find({})
    .then((persons) => {
      console.log('phonebook:')
      persons.forEach((p) => console.log(p.name, p.number))
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
} else {
  if (!name || !number) {
    console.log('For adding, provide name and number: node mongo.js <password> <name> <number>')
    process.exit(1)
  }
  const person = new Person({ name, number })
  person
    .save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
