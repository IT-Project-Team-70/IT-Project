const passport = require('passport')
const crypto = require('crypto')
const dotenv = require('dotenv')
const authHelper = require('../helper/authHelper')
const Token = require('../models/token')
const User = require('../models/user')
const { createBrotliCompress } = require('zlib')
require('../passport')
dotenv.config()

function checkCookie(req, res) {
  try {
    const result = {
      email: req.user.email,
      username: req.user.username,
      id: req.user._id,
    }
    console.log(result)
    return res.status(200).send(result)
  } catch (err) {
    res.status(500).send('Get userInfo unsuccessfully')
    throw new Error(err)
  }
}

function loginSuccess(req, res, next) {
  //redirect to personal working space
  console.log(`req.user from loginSuccess: ${req.user}`)
  //username, id, and email.
  const result = {
    email: req.user.email,
    username: req.user.username,
    id: req.user._id,
    role: req.user.role,
  }
  return res.status(200).send(result)
}
function loginFailure(req, res, next) {
  return res.status(401).send('Either password or username is incorrect')
}
function loginGoogleSuccess(req, res, next) {
  return res.redirect(process.env.BASE_URL_FRONT_END)
  }

async function registerHandler(req, res) {
  try {
    const password = req.body.password
    const username = req.body.username
    const email = req.body.email
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
       email: email,
       salt: saltHash.salt,
       hash: saltHash.hash,
       username: username,
     })
     let user = await newUser.save()
    //verify email 
    if(authHelper.verifyEmail(email)){
      return res.status(200).send('Please check your email to verify your account')
    }
    else{
      res.status(500).send('Errors while sending email verification')
    }
  } catch (err) {
    res.status(500).send('Errors while registering')
    throw new Error(err)
  }
}
async function completeRegistration(req, res){
  try{
    //redirect to the home page
    res.redirect(process.env.BASE_URL_FRONT_END)
  }
  catch(err){
    res.status(500).send('Errors while redirecting back to the homepage')
    throw new Error(err)
  }
}
function logoutHandler(req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err)
    }
    if (req.session) {
      console.log(req.session)
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

async function checkToken(req, res) {
  try {
    let token = await Token.findOne({ token: req.params.tokenId })
    if (token == null) {
      return res.redirect(
        `${process.env.BASE_URL_FRONT_END}/resetPassword/failure`
      )
    }
    return res.redirect(
      `${process.env.BASE_URL_FRONT_END}/resetPassword/${req.params.userId}`
    )
  } catch (err) {
    res.status(500).send('Errors while resetting password')
    throw new Error(err)
  }
}

async function resetPassword(req, res) {
  try {
    const hashSalt = authHelper.genPassword(req.body.newPassword)
    const id = req.body.userId
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: { hash: hashSalt.hash, salt: hashSalt.salt },
      }
    )
    return res.status(200).send(user)
  } catch (err) {
    res.status(500).send('Errors while updating password')
    throw new Error(err)
  }
}

async function forgetPasswordHandler(req, res) {
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
  loginGoogleSuccess,
  checkToken,
  resetPassword,
  forgetPasswordHandler,
  checkCookie,
}
