const { default: mongoose } = require("mongoose");
const crypto = require("crypto");

//we store hash and salt into our database instead of the plain password to enhance security
const userSchema = new mongoose.Schema({
  gmail: { type: "string", unique: true },
  salt: "string",
  hash: "string",
  username: { type: "string", unique: true },
  google: {
    id: { type: String },
    name: { type: String },
    email: { type: String },
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
