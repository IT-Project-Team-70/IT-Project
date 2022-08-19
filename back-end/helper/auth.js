const crypto = require('crypto')

//This function is used to generate salt and hash for a plain text password when a user first registers.
function genPassword(password){
  const salt = crypto.randomBytes(32).toString('hex')
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return{
    salt: salt, 
    hash: genHash
  }
}
//This function is used to check if the password provided by the user is correct when he first logs in. 
function isValidPassword(password, hash, salt){
  const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return hashVerify === hash
}
module.exports = {
  isValidPassword,
  genPassword
}