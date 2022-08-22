const mongoose = require('mongoose')

// ******************************************************************************************** //
// Connect to the database
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

// Connect to your mongo database using the MONGO_URL environment variable
// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // userCreateIndex: true,
//     // dbName: ''
// });

// Event handlers for the connection
// const db = mongoose.connection;
// exit on error
// db.on('error', (err) => {
//     console.log(err);
//     process.exit(1);
// });
// Log to console once the database is open
// db.once('open', () => { console.log(`Mongo connection started on ${db.host}:${db.port}`) });

// ******************************************************************************************** //
const user = require('../model/user')
const recipe = require('../model/recipe')
const validation = require('../model/validation')

module.exports = {
  user: user,
  User: user.User,
  recipe: recipe,
  Recipe: recipe.Recipe,
  validation: validation,
}
