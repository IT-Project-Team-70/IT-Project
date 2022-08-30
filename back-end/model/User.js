const { default: mongoose } = require('mongoose')
const validation = require('./validation')
// const crypto = require('crypto')

/* ***************************************************************************************** */
//we store hash and salt into our database instead of the plain password to enhance security
const userSchema = new mongoose.Schema({
  role: { type: String, required: true, default: 'user' },
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },

  salt: { type: String },
  hash: { type: String },

  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],

  friends: [
    {
      details: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, default: 'pending' },
      // conversation: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
    },
  ],
})

userSchema.methods.joiValidate = function (user) {
  return validation.validateUser(user)
}

const UserModel = mongoose.model('User', userSchema)


/* ***************************************************************************************** */
module.exports = {
  User: UserModel,
}
