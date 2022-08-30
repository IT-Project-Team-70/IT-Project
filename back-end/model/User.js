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

// Create a new user
async function registerNewUser(user) {
  // const { error } = user.joiValidate()
  // if (error) {
  //   throw new Error(error.details[0].message)
  //   return error
  // }

  let existedUser = await UserModel.findOne({ email: user.email })
  if (existedUser) {
    return err
  }

  try {
    const newUser = new UserModel(user)
    const result = await newUser.save()
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

// retrieve user from database
async function getUserByID(id) {
  try {
    const user = await UserModel.findById(id)
    if (!user) {
      console.log('user not found')
      return null
    }
    return user
  } catch (err) {
    console.log(err)
    // throw new Error(err)
  }
}

async function getUserByUsername(username) {
  try {
    const user = await UserModel.findOne({ username: username })
    if (!user) {
      console.log('user not found')
      return null
    }
    return user
  } catch (err) {
    console.log(err)
    // throw new Error(err)
  }
}

// update user details
async function updateUser(id, user) {
  // validate user details here
  try {
    const result = await UserModel.findByIdAndUpdate(id, user)
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

// delete user from database
async function deleteUser(id) {
  try {
    const result = await UserModel.findByIdAndDelete(id)
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

/* ***************************************************************************************** */
module.exports = {
  User: UserModel,
  registerNewUser,
  getUserByID,
  getUserByUsername,
  updateUser,
  deleteUser,
}
