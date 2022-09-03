const passport = require('passport')
require('../passport.js')
const crypto = require('crypto')
const authHelper = require('../helper/authHelper')
const Token = require('../models/token')
const User = require('../models/user')

function loginSuccess (req, res, next){
  //redirect to personal working space
  return res.status(200).send('You successfully logged in')
}

function loginFailure (req, res, next){
  return res.status(401).send('Either password or username is incorrect')
}

async function registerHandler(req, res){
  try{
  const password = req.body.password
  const username = req.body.username
  const email = req.body.email
  //generate a hash and a salt from the given password
  const saltHash = authHelper.genPassword(password)
  // verify your email to log in successfully
  //register a new user account
  let newUser = new User({
    email: email,
    salt: saltHash.salt,
    hash: saltHash.hash,
    username: username,
  })
  let user = await newUser.save()
  return res.status(200).send('Register successfully')
  }
  catch(err){
    res.status(500).send('Errors while registering')
    throw new Error(err)
  }
}

function logoutHandler(req, res, next){
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

async function resetPasswordHandler(req, res){
  try { 
    let token = await Token.findOne({ token: req.params.token })
    if (token == null) {
      req.flash('info', 'This token has been expired')
      return res.status(404).send(null)
    }
    return res.status(200).send(token)
  } catch (err) {
    res.status(500).send('Errors while resetting password')
    throw new Error(err)
  }
}

async function updatePasswordHandler(req, res){
  try {
    const hashSalt = authHelper.genPassword(req.body.newPassword)
    const id = req.body.userId
    const user = await User.findByIdAndUpdate(id, {
      $set: { hash: hashSalt.hash, salt: hashSalt.salt },
    })
    return res.status(200).send(user)
  } catch (err) {
    res.status(500).send('Errors while updating password')
    throw new Error(err)
  }
}

async function forgetPasswordHandler(req, res){
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
