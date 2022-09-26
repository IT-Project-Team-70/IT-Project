const express = require('express')
const router = express.Router()

// const { isAuthenticated, hasRole } = require('../helper/auth')

const landingController = require('../controllers/landingController')

/* ********************************************************************************************* */

router.get('/', (req, res) => {
  landingController.getLandingPage(req, res)
})

module.exports = router
