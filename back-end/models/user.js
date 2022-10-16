const { boolean } = require('joi')
const { default: mongoose } = require('mongoose')
const validation = require('./validation')

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
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  // gmail: { type: "string", unique: true },
  salt: { type: String },
  hash: { type: String },
  googleId: {type: String},

  // salt: "string",
  // hash: "string",

  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  friends: [
    {
      details: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, default: 'pending' },
      // conversation: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
    },
  ],
  socketId: {type: String},
  notifications: [{message: String, recipeId: String, time: Date, unread: {type: Boolean, default: true}, sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}]
  //comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  //likedComments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

userSchema.methods.joiValidate = function (user) {
  return validation.validateUser(user)
}

const UserModel = mongoose.model('User', userSchema)

/* ***************************************************************************************** */
// module.exports = {
//   User: UserModel,
// }
module.exports = UserModel
