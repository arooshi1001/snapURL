const mongoose = require('mongoose')
const shortId = require('shortid')

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    default: shortId.generate,
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)
