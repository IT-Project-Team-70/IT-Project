const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  token: { type: String, required: true },
  //the token will expire after 1 hour since the time it is created
  createdAt: { type: Date, default: Date.now(), expires: 3600 },
})

const tokenModel = mongoose.model('Token', tokenSchema)
module.exports = tokenModel
