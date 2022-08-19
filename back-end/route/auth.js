const authHelper = require('../helper/auth')
const User = require('../model/User')
const express = require('express')
const app = express()
const passport = require('passport')


//handle the login request
/*router.post('/login', (req, res) =>{
  passport.authenticate('local', (err, user, info) =>{

  })
})*/

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
  //res.redirect('/login')
})
module.exports = app
