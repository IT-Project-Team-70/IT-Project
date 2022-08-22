const { isAuthenticated, hasRole } = require('../helper/auth')

const express = require('express')
const router = express.Router()

/* ********************************************************************************************* */
router.get('/', isAuthenticated, (req, res) => {
  // res.redirect('/personalKitchen/home')
})
