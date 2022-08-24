const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const authRouter = require("./route/auth");
const passport = require("passport");
const flash = require("express-flash");

const app = express();

app.use(flash());
require("./passport");

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  sameSite: 'none'
}))
require('./passport');

dotenv.config();

// Declare the middleware for the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create a session
app.use(session({
  secret: process.env.COOKIE_SECRET, 
  credentials: true, 
  name: "sid", 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE
  }),
  cookie: {
    secure: process.env.ENVIRONMENT === "production", //if secure is true => only transmit over HTTPS
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.use(passport.initialize());
app.use(passport.authenticate('session'))

//add authentication routes to the app
app.use(authRouter)

// app.use(express.static(__dirname + '/public'))
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Env: Develop Model -- Morgan is enabled ... ");
}

//loading environment variable
const port = process.env.PORT;
const database = process.env.DATABASE;

//connect to mongo database from environment variable
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // dbName: ''
  })
  .then(() => console.log("database is connected"));

// Event handlers for the connection
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
  process.exit(1);
});
db.once("open", () => {
  console.log(`Mongo connection started on ${db.host}: ${db.port}`);
});

// Start the server & listen for requests
app.set("port", port);

//configure https 
/*https.createServer({
  key: fs.readFileSync('../security/key.pem'),
  cert: fs.readFileSync('../security/cert.pem'),
  rejectUnauthorized: false,
  
},*/
app
.listen(port || 3000,  () => {
  console.log(`Ther server is running on ${port}`);
});