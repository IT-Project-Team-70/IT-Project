const { default: mongoose } = require("mongoose");

//we store hash and salt into our database instead of the plain password to enhance security
const userSchema = new mongoose.Schema({email: {type: 'string', unique: true}, salt: 'string', hash: 'string', username: {type: 'string', unique: true}})
const userModel = mongoose.model('User', userSchema)
module.exports = userModel