const userHelper = require('../helper/userHelper')
const recipeHelper = require('../helper/recipeHelper')
const generalHelper = require('../helper/generalHelper')
const authHelper = require('../helper/authHelper')
const User = require('../models/user')

/* ********************************************************************************************** */
async function getAllUsers(req, res) {
  try {
    const result = await userHelper.getAllUsers()
    if (result.length === 0) {
      return res.status(200).send('No user in the system')
    }
    return res.status(200).send(result)
  } catch (err) {
    res.status(500).send('Errors while getting all users')
    throw new Error(err)
  }
}
async function getUserById(req, res) {
  try {
    const id = req.params.id
    const user = await userHelper.getUserByID(id)
    if (!user) {
      return res.status(404).send('User not found')
    }
    return res.status(200).send(user)
  } catch (err) {
    res.status(500).send('Errors while getting user')
    throw new Error(err)
  }
}

async function registerAdmin(req, res) {
  try {
    const password = req.body.password
    const username = req.body.username
    const email = req.body.email

    // check if user already exists
    let existedUser = await User.findOne({ email })
    if (existedUser) {
      return res
        .status(403)
        .send('This email has been used. Please choose another one!')
    }

    // check if there are duplicate usernames in the database
    let duplicate = await User.findOne({ username })
    if (duplicate != null) {
      return res
        .status(403)
        .send('This username has been taken. Please choose another one!')
    }

    //generate a hash and a salt from the given password
    const saltHash = authHelper.genPassword(password)
    //register a new user account
    let newUser = new User({
      role: 'admin',
      username: username,
      email: email,
      salt: saltHash.salt,
      hash: saltHash.hash,
    })
    let user = await newUser.save()
    //verify email
    if (authHelper.verifyEmail(email)) {
      return res
        .status(200)
        .send('Please check your email to verify your account')
    } else {
      res.status(500).send('Errors while sending email verification')
    }
  } catch (err) {
    res.status(500).send('Errors while registering')
    throw new Error(err)
  }
}

async function loginAdmin(req, res) {}

async function deleteUserById(req, res) {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send('User not found')
    }
    await user.remove()
    return res.status(200).send('User deleted successfully')
  } catch (err) {
    res.status(500).send('Errors while deleting user')
    throw new Error(err)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  registerAdmin,
  loginAdmin,
  deleteUserById,
}
