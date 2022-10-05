const authController = require('../controllers/authController')
const express = require('express')
const app = express()
const passport = require('passport')
require('../passport.js')

const { isAuthenticated, hasRole } = require('../helper/authHelper')

app.get('/checkCookie', isAuthenticated, authController.checkCookie)

//handle the login request
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/loginFailure',
  }),
  (req, res) => {
    authController.loginSuccess(req, res)
  }
)

//handle user's logout
app.post('/logout', authController.logoutHandler)
//define the register page
app.post('/register', authController.registerHandler)

//this will take us to the google account sign in page
app.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/loginFailure',
    successRedirect: '/loginGoogleSuccess',
  })
)

//login unsuccessfully
app.get('/loginFailure', authController.loginFailure)

//login successfully
app.get('/loginSuccess', authController.loginSuccess)

//login Google successfully
app.get('/loginGoogleSuccess', authController.loginGoogleSuccess)

//check token before resetting user's password
app.get('/resetPassword/:userId/:tokenId', authController.checkToken)
app.get('/resetPassword/:userId', ()=>{})
//update password handler
app.post('/resetPassword', authController.resetPassword)

//forget password
app.post('/forgetPassword', authController.forgetPasswordHandler)

//when visit the protected routes, the server checks the req to see if the req.session.passport.user exists
//the req.session.passport.user = userId
//app.get('protected-routes', )
module.exports = app
