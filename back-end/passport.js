const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./model/User");
const authHelper = require("./helper/auth.js");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();



//configure Local Strategy for users to log in
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username })
      .then((user) => {
        //no user found
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        valid = authHelper.isValidPassword(password, user.hash, user.salt)
        console.log(valid)
        if (!valid) {
          return done(null, false);
        }
        //login successful
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

// //conffigure the Google Strategy for users to log in
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BASE_URL}/personalKitchen`,
//     },
//     async function (request, accessToken, google, done) {
//       try {
//         let user = User.findOne({ "google.id": google.id });
//         if (user) {
//           return done(null, user);
//         }
//         user = new User({
//           google: {
//             name: google.displayName,
//             gmail: google.gmail,
//             id: google.id,
//           },
//         });
//         await user.save();
//       } catch (err) {
//         throw new Error("Google Authentication failed!");
//       }
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((user, done) => {
  User.findById(user._id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
