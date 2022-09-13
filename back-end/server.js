const morgan = require("morgan");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");

// Experss
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
require("./passport");

// Databse
const mongoDB = require("./models");
const MongoStore = require("connect-mongo");
const cors = require("cors");

// Routers
const landingRouter = require("./routes/landing.js");
const personalKitchenRouter = require("./routes/personalKitchen.js");
const everyoneKitchenRouter = require("./routes/everyoneKitchen.js");
const testingRouter = require("./routes/testing.js");
const authRouter = require("./routes/auth.js");
const { NONAME } = require("dns");
// ******************************************************************************************** //
// Initialize the app
const app = express();
dotenv.config();
const env = process.env.ENVIRONMENT || app.get("env");
if (env === "development") {
  app.use(morgan("tiny"));
  console.log("Env: Develop Model -- Morgan is enabled ... ");
}
// Declare Middlewares for the app
app.use(flash());
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    sameSite: "none",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.set('trust proxy', 1)
// app.use(express.static(__dirname + '/public'))
//create a session
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE,
    }),
    cookie: {
      secure: true, //if secure is true => only transmit over HTTPS
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none"
    },
  })
);
app.use(passport.initialize());
app.use(passport.authenticate("session"));

// ******************************************************************************************** //
// Add routers to the app
app.use(authRouter);
app.use("/", landingRouter);
app.use("/home", landingRouter);
app.use("/personalKitchen", personalKitchenRouter);
app.use("/forum", everyoneKitchenRouter);
app.use("/testing", testingRouter);

app.all("*", (req, res) => {
  // render the 404 page
  res.status(404).send("404 Not Found");
});

// ******************************************************************************************** //
// Start the server & listen for requests
const port = process.env.PORT;
app.set("port", port);

//configure https
https
  .createServer(
    {
      key: fs.readFileSync("../security/DontForgetUrRecipe.key"),
      cert: fs.readFileSync("../security/DontForgetUrRecipe.crt"),
      rejectUnauthorized: false,
    },
    app
  )
  .listen(port || 8080, () => {
    console.log(`Ther server is running on port ${port}`);
  });
