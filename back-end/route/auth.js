const express = require('express')
const app = express()

const passport = require('passport')
const crypto = require('crypto')
require('../passport')

const authHelper = require('../helper/auth')
const Token = require('../model/Token')
const User = require('../model/user')
const authController = require('../controllers/authController')

//handle the login request
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/loginFailure',
    successRedirect: '/loginSuccess',
  }),
  (req, res, next) => {
    if (err) next(err)
  }
)

//handle user's logout
app.post('/logout', (res, req) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})
//define the register page
app.post('/register', (req, res) => {
  const password = req.body.password
  const username = req.body.username
  const email = req.body.email

  //generate a hash and a salt from the given password
  const saltHash = authHelper.genPassword(password)

  //register a new user account
  const newUser = new User({
    email: email,
    salt: saltHash.salt,
    hash: saltHash.hash,
    username: username,
  })

  newUser
    .save()
    .then((user) => {
      console.log(user)
    })
    .catch((err) => res.status(500).send('Errors while registering'))

  //redirect users to the login page
  res.redirect('/login')
})

//login unsuccessfully
app.get('/loginFailure', function (req, res, next) {
  return res.status(401).send('Either password or username is incorrect')
})

//login successfully
app.get('/loginSuccess', function (req, res, next) {
  console.log(req.session)
  return res.status(200).send('You successfully logged in')
})

app.get('/resetPassword/:userId/:token', async (req, res) => {
  return res.status(200).send('Hello word')
})

//forget password
app.post('/forgetPassword', async (req, res) => {
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
})
module.exports = app
