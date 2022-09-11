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
    dbName: "Don't-Forget-your-Recipes",
  })
  .then(() => console.log('Database is Connected !!'))

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
