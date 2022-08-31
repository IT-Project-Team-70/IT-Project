const mongoose = require('mongoose')

// ******************************************************************************************** //
// Connect to the database
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//loading environment variable
const database = process.env.DATABASE
// Connect to your mongo database from environment variable
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // userCreateIndex: true,
    dbName: "Don't Forget your Recipes",
  })
  .then(() => console.log('database is connected'))

// Event handlers for the connection
const db = mongoose.connection
// exit on error
db.on('error', (err) => {
  console.log(err)
  process.exit(1)
})
// Log to console once the database is open
db.once('open', () => {
  console.log(`Mongo connection started on ${db.host}:${db.port}`)
})

// ******************************************************************************************** //
const User = require('../model/user')
const Recipe = require('../model/recipe')
const Tag = require('../model/tag')
const Token = require('../model/token')
const validation = require('../model/validation')

// module.exports = {
//   User,
//   Recipe,
//   Tag,
//   Token,
//   validation,
// }
