
const morgan = require('morgan')
const dotenv = require('dotenv')
const https = require('https')
const path = require('path');
const http = require("http")
const fs = require('fs')
// Experss
const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
require('./passport')
// Databse
const mongoDB = require('./models')
const MongoStore = require('connect-mongo')
const cors = require('cors')
// Routers
const landingRouter = require('./routes/landing.js')
const personalKitchenRouter = require('./routes/personalKitchen.js')
const everyoneKitchenRouter = require('./routes/everyoneKitchen.js')
const viewRecipeRouter = require('./routes/viewingRecipe.js')
const testingRouter = require('./routes/testing.js')
const authRouter = require('./routes/auth.js')
// ******************************************************************************************** //
//get .env from the root folder
dotenv.config({ path: '../.env' });
// Initialize the app
const app = express()
if (process.env.ENVIRONMENT === 'development') {
  app.use(morgan('tiny'))
  console.log('Env: Develop Model -- Morgan is enabled ... ')
}
// Declare Middlewares for the app
app.use(flash())
app.use(
  cors({
    origin: [process.env.BASE_URL_FRONT_END],
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname +'/../front-end/build')));
//create a session
app.use(
  session(process.env.HEROKU_MODE==="ON"? {
    secret: process.env.COOKIE_SECRET,
    //credentials: true,
    name: 'sid',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      //sameSite:'none',
      //secure:true
      sameSite: 'strict'
    }}:{
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE,
    }),
    cookie: {
      // secure: process.env.ENVIRONMENT === 'production', //if secure is true => only transmit over HTTPS
      maxAge: 24 * 60 * 60 * 1000,
      sameSite:'none',
      secure:true
    },
  })
)
app.use(passport.initialize())
app.use(passport.authenticate('session'))
// ******************************************************************************************** //
// Add routers to the app
app.use(authRouter)
app.use('/', landingRouter)
app.use('/home', landingRouter)
app.use('/personalKitchen', personalKitchenRouter)
app.use('/forum', everyoneKitchenRouter)
app.use('/viewRecipe', viewRecipeRouter)
app.use('/testing', testingRouter)
app.all('*', (req, res) => {
  // render the 404 page
  res.status(404).send('404 Not Found')
})
// ******************************************************************************************** //
// Start the server & listen for requests
const port = process.env.PORT
app.set("port", port);
//if HEROKU_MODE=="on"(when deploying onto heroku and project config HEROKU_MODE=="on")
const server = process.env.HEROKU_MODE==="ON"? http.createServer(app):
//configure https
https.createServer({
  key: fs.readFileSync('../security/DontForgetUrRecipe.key'),
  cert: fs.readFileSync('../security/DontForgetUrRecipe.crt'),
  rejectUnauthorized: false,
  
},app);
server.listen(port || 8080, () => {
  console.log(`Ther server is running on ${port}`);
});
module.exports = server