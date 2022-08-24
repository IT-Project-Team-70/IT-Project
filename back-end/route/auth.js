const authHelper = require("../helper/auth");
const User = require("../model/User");
const Token = require("../model/Token");
const express = require("express");
const app = express();
const passport = require("passport");
const crypto = require("crypto");
require("../passport");

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
app.post("/logout", (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    if(req.session){
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        }
       
      })
     return res.status(200).send("logout successfully");;
    }
    return res.status(200).send("logout successfully")
   
  });
  
});
//define the register page
app.post("/register", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  const email = req.body.email;
  
  //generate a hash and a salt from the given password
  const saltHash = authHelper.genPassword(password);

  //register a new user account
  const newUser = new User({
    email: email,
    salt: saltHash.salt,
    hash: saltHash.hash,
    username: username,
  });

  newUser
    .save()
    .then((user) => {
      console.log(user);
      res.status(200).send("Register successfully");
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("Errors while registering")});
});

//login unsuccessfully
app.get("/loginFailure", function (req, res, next) {
  return res.status(401).send("Either password or username is incorrect");
});

//login successfully
app.get("/loginSuccess", function (req, res, next) {
  console.log(req.session);
  //redirect to personal working space

  return res.status(200).send("You successfully logged in");
});

app.get("/resetPassword/:userId/:token", async (req, res) => {
  try {
    let token = await Token.findOne({ token: req.params.token });
    if (token == null) {
      req.flash("info", "This token has been expired");
      res.redirect("/forgetPassword");
    }
    return res.status(200);
  } catch (err) {
    return res.status(500).send("Errors while resetting password");
  }
});

app.post("/resetPasword/:userId/:token", async (req, res) => {
  try {
    const newPassword = req.body.newPassword;
    const id = req.params.userId;
    await User.findByIdAndUpdate(id, { password: newPassword });
    return res.status(200).send("Update password successfully");
  } catch (err) {
    return res.status(500).send("Errors while resetting password");
  }
});

//forget password
app.post("/forgetPassword", async (req, res) => {
  const email = req.body.email;

  //find the email to check if it exists or not
  const user = await User.findOne({ email: email });
  //cannot verify the user's email
  if (!user) {
    return res.status(404).send("Cannot verified the user's email");
  }
  //check if the current user has token or not
  let token = await Token.findOne({ userId: user._id });
  if (!token) {
    //create a new token
    token = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await token.save();
  }
  //send a reset to this email
  authHelper.sendEmail(email, user._id, token.token);
});

//when visit the protected routes, the server checks the req to see if the req.session.passport.user exists
//the req.session.passport.user = userId
//app.get('protected-routes', )
module.exports = app;
