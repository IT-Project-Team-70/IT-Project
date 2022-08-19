const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require("./model/User")
const authHelper = require("./helper/auth")

//configure strategy
passport.use(new LocalStrategy(
  function(email, passport, done){
    User.findOne({email: email}).then( user => {
      //no user found
      if(!user){
        return done(null, false, {message: 'Incorrect email or password'})
      }
      //password is invalid
      if(!authHelper.isValidPassword(password, user.hash, user.salt)){
        return done(null, false)
      }
      //login successful 
      return done(null, user)
    }).catch(err => done(err))
  }
))

/*passport.serializeUser((user, done) =>{
  done(user., )
})*/

passport.deserializeUser(()=>{

})

const deserializeUser
