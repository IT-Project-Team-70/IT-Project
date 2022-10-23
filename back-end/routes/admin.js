const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../passport.js')

const adminController = require('../controllers/adminController')

const { isAuthenticated, hasRole } = require('../helper/authHelper')

/* ********************************************************************************************* */

router.get('/')

router.get('/users', adminController.getAllUsers)
router.get('/users/:id', adminController.getUserById)

router.post('/singup', adminController.registerAdmin)
router.post('/login', adminController.loginAdmin)

router.post('/users/delete/:id', adminController.deleteUserById)

module.exports = router
