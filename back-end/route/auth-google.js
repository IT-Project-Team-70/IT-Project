const passport = require("passport");
const express = require("express");
const app = express();

//This route will redirect the user to Google, where they will be authenticate.
app.get("/google", passport.authenticate("google"), { scope: ["email"] });
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/loginSuccess",
    failureRedirect: "/loginFailure",
  })
);
module.exports = app;
