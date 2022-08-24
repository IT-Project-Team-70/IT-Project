const mongoose = require("mongoose")

const tokenSchema = mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token:{type: String, required:true},
  //the token will expire after 1 hour since the time it is created
  createdAt: {type: Date, default: Date.now(), expires: 36000}
})

const tokenModel = mongoose.model('Token', tokenSchema)
module.exports = tokenModel