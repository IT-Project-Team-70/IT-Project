const express = require('express')
const router = express.Router()

// const { isAuthenticated, hasRole } = require('../helper/auth')

const ekController = require('../controllers/everyoneKitchenController')

/* ********************************************************************************************* */

router.get('/', (req, res) => {
  ekController.getEveryoneKitchen(req, res)
})
router.get('/:id', (req, res) => {
  ekController.getOneRecipeById(req, res)
})

router.post('/addFavorite/:id', (req, res) => {
  ekController.addFavorite(req, res)
})
router.post('/removeFavorite/:id', (req, res) => {
  ekController.removeFavorite(req, res)
})
router.post('/rating/:id/:score', (req, res) => {
  ekController.rateRecipe(req, res)
})
router.post('/comment/:id', (req, res) => {
  ekController.commentRecipe(req, res)
})

module.exports = router
