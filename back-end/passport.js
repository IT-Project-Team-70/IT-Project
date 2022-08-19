const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require("./model/User")

//configure strategy
passport.use(new LocalStrategy(
  function(email, passport, done){
    User.findOne({email: email}).then( user => {
      //no user found
      if(!user){
        return done(null, false, {message: 'Incorrect email or password'})
      }
      //password is invalid
      if(!user.verifyPassword(password)){
        return done(null, false, {message: 'Incorrect password'})
      }
      //login successful 
      return done(null, user, {message: 'Logged In Successfully'})
    }).catch(err => done(err))
  }
))

