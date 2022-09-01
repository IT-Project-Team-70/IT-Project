const passport = require('passport')
require('../passport.js')
const crypto = require('crypto')

const authHelper = require('../helper/auth')
const Token = require('../model/Token')
const User = require('../model/user')

const loginSuccess = (req, res, next) => {
  console.log(req.session)
  //redirect to personal working space
  return res.status(200).send('You successfully logged in')
}

const loginFailure = (req, res, next) => {
  return res.status(401).send('Either password or username is incorrect')
}

const registerHandler = async (req, res) => {
  const password = req.body.password
  const username = req.body.username
  const email = req.body.email
  //generate a hash and a salt from the given password
  const saltHash = authHelper.genPassword(password)
  // verify your email to log in successfully
  //register a new user account
  const newUser = new User({
    email: email,
    salt: saltHash.salt,
    hash: saltHash.hash,
    username: username,
  })
  await newUser
    .save()
    .then((user) => {
      console.log(user)
      res.status(200).send('Register successfully')
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Errors while registering')
    })
}

const logoutHandler = (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err)
    }
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          return next(err)
        }
      })
      return res.status(200).send('logout successfully')
    }
    return res.status(200).send('logout successfully')
  })
}

const resetPasswordHandler = async (req, res) => {
  try {
    let token = await Token.findOne({ token: req.params.token })
    if (token == null) {
      req.flash('info', 'This token has been expired')
      return res.status(404).send(null)
    }
    return res.status(200).send(token)
  } catch (err) {
    return res.status(500).send('Errors while resetting password')
  }
}

const updatePasswordHandler = async (req, res) => {
  try {
    const hashSalt = authHelper.genPassword(req.body.newPassword)
    const id = req.body.userId
    const user = await User.findByIdAndUpdate(id, {
      $set: { hash: hashSalt.hash, salt: hashSalt.salt },
    })
    return res.status(200).send(user)
  } catch (err) {
    return res.status(500).send('Errors while updating password')
  }
}

const forgetPasswordHandler = async (req, res) => {
  const email = req.body.email
  //find the email to check if it exists or not
  const user = await User.findOne({ email: email })
  //cannot verify the user's email
  if (!user) {
    return res.status(404).send("Cannot verified the user's email")
  }
  //check if the current user has token or not
  let token = await Token.findOne({ userId: user._id })
  if (!token) {
    //create a new token
    token = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    })
    await token.save()
  }
  //send a reset to this email
  authHelper.sendEmail(email, user._id, token.token)
  return res.status(200).send('send email successfully')
}

module.exports = {
  logoutHandler,
  registerHandler,
  loginSuccess,
  loginFailure,
  resetPasswordHandler,
  updatePasswordHandler,
  forgetPasswordHandler,
}