const authHelper = require('../helper/auth')
const User = require('../model/User')
const express = require('express')
const app = express()
const passport = require('passport')
const nodemailer = require('nodemailer')
require('../passport')

//handle the login request
app.post('/login', passport.authenticate('local', {failureRedirect: '/loginFailure', successRedirect: '/loginSuccess'}), (req, res, next)=>{
  if (err) next(err)
})

//handle user's logout
app.post('/logout', (res, req)=>{
  req.logout(function(err){
    if(err){
      return next(err)
    }
    res.redirect('/')
  })
})
//define the register page
app.post('/register', (req, res)=>{
  const password = req.body.password;
  const username = req.body.username;
  const email = req.body.email;

  //generate a hash and a salt from the given password 
  const saltHash = authHelper.genPassword(password)
  
  //register a new user account 
  const newUser = new User({
    email: email,
    salt: saltHash.salt,
    hash: saltHash.hash,
    username: username
  })

  newUser.save().then((user) =>{
    console.log(user)
  }).catch(err => res.status(500).send("Errors while registering"))

  //redirect users to the login page
  res.redirect('/login')
})

//login unsuccessfully
app.get('/loginFailure', function(req, res, next){
  res.status(401).send('Either password or username is incorrect')
})

//login successfully 
app.get('/loginSuccess', function(req, res, next){
  console.log(req.session)
  res.status(200).send('You successfully logged in')
})

//forget password
app.get('/forgetPassword', function(req, res, next){
  const email = req.body.email

  //find the email to check if it exists or not 
  User.findOne()
})
module.exports = app
