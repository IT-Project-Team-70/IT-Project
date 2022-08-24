const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/User");
const authHelper = require("./helper/auth");
const session = require("express-session");

//configure strategy
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username })
      .then((user) => {
        //no user found
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        if (!authHelper.isValidPassword(password, user.hash, user.salt)) {
          return done(null, false);
        }
        //login successful
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((user, done) => {
  User.findById(user._id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
