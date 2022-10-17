const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('./models/user')
const authHelper = require('./helper/authHelper.js')
const path = require('path');
const dotenv = require('dotenv')
//get .env from the root folder
dotenv.config({ path: '../.env' })

//configure Local Strategy for users to log in
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username })
      .then((user) => {
        //no user found
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' })
        }
        valid = authHelper.isValidPassword(password, user.hash, user.salt)
        console.log(valid)
        if (!valid) {
          return done(null, false)
        }
        //login successful
        return done(null, user)
      })
      .catch((err) => done(err))
  })
)

//conffigure the Google Strategy for users to log in
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL_FRONT_END}/google/callback`,
      passReqToCallBack: true,
    },
    async function (request, accessToken, google, done) {
      try {
        let user = await User.findOne({ email: google.emails[0].value })

        if (user) {
          return done(null, user)
        } else {
          console.log(google.emails[0].value)
          user = new User({
            email: google.emails[0].value,
            username: google.displayName,
          })

          await user.save()
          done(null, user)
        }
      } catch (err) {
        console.log(err)
        throw new Error('Google Authentication failed!')
      }
    }
  )
)

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null, { message: 'User not found' }))
})
