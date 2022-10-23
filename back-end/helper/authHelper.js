const crypto = require('crypto')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

//This function is used to generate salt and hash for a plain text password when a user first registers.
function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  return {
    salt: salt,
    hash: genHash,
  }
}
//This function is used to check if the password provided by the user is correct when he first logs in.
function isValidPassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  return hashVerify === hash
}
async function verifyEmail(email) {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      from: process.env.EMAIL_USER,
    })
    const message = {
      from: `Dont Forget Your Recipe <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification',
      html:
        `<b>Hey there!</b><br> Thanks for joining us !<br>Click on the link below to back to the homepage and login.<br><a href =  ${process.env.BASE_URL_FRONT_END}` +
        '>here</a>',
    }
    await transporter.sendMail(message)
    return true
  } catch (err) {
    return false
    throw new Error(err)
  }
}
//This function is used to send the reset password link
async function sendEmail(email, userId, token) {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      from: process.env.EMAIL_USER,
    })
    const authDetails = `${userId}/${token}`
    console.log(authDetails)
    //https://localhost:8000/resetPassword/' + authDetails + '
    //https://dont-recipe-frontback.herokuapp.com/resetPassword'
    const message = {
      from: `Dont Forget Your Recipe <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'reset password',
      html:
        `<b>Hey there! </b><br> Please click onto the link below to reset your password<br><a href =  ${process.env.BASE_URL}/resetPassword/` +
        authDetails +
        '>here</a>',
    }
    await transporter.sendMail(message)
  } catch (err) {
    throw new Error(err)
  }
}

function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log(req.user)
    return res.status(401).send('Please login first')
  } else {
    return next()
  }
}

function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return next()
  } else {
    return res.status(401).send('You are not authorized admin')
  }
}

function hasRole() {}

module.exports = {
  genPassword,
  sendEmail,
  verifyEmail,
  isValidPassword,
  isAuthenticated,
  isAdmin,
  hasRole,
}
