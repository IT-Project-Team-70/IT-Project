const authController = require("../controller/auth")
const express = require("express");
const app = express();
const passport = require("passport");
require("../passport.js");

//handle the login request
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/loginFailure",
    successRedirect: "/loginSuccess",
  }),
  (req, res, next) => {
    if (err) next(err);
  }
);

//handle user's logout
app.post("/logout", authController.logoutHandler)
//define the register page
app.post("/register", authController.registerHandler)

//this will take us to the google account sign in page
app.get("/google", passport.authenticate("google", { scope: ["email"] }));
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/loginSuccess",
    failureRedirect: "/loginFailure",
  })
);

//login unsuccessfully
app.get("/loginFailure", authController.loginFailure)

//login successfully
app.get("/loginSuccess", authController.loginSuccess)

//reset password
app.get("/resetPassword/:userId/:token",authController.resetPasswordHandler)

//update password handler 
app.post("/updatePassword", authController.updatePasswordHandler)

//forget password
app.post("/forgetPassword", authController.forgetPasswordHandler)

//when visit the protected routes, the server checks the req to see if the req.session.passport.user exists
//the req.session.passport.user = userId
//app.get('protected-routes', )
module.exports = app;
