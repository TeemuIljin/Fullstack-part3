const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

if (url) {
  console.log('connecting to', url.replace(/:[^:@]+@/, ':****@'))
  mongoose.connect(url, { family: 4 })
    .then(() => console.log('connected to MongoDB'))
    .catch((err) => console.log('error connecting to MongoDB:', err.message))
}

// Phone: length >= 8, two parts separated by -, first part 2 or 3 digits, second part digits (e.g. 09-1234556, 040-22334455)
const phoneValidator = (v) => /^\d{2,3}-\d+$/.test(v) && v.length >= 8

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: phoneValidator,
      message: (props) => `${props.value} is not a valid phone number (e.g. 09-1234556 or 040-22334455)`
    }
  }
})

personSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
