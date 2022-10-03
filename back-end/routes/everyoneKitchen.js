const express = require('express')
const router = express.Router()

// const { isAuthenticated, hasRole } = require('../helper/auth')

const ekController = require('../controllers/everyoneKitchenController')
const authHelper = require('../helper/authHelper')
/* ********************************************************************************************* */

router.get('/', authHelper.isAuthenticated, (req, res) => {
  ekController.getEveryoneKitchen(req, res)
})
router.get('/:id', authHelper.isAuthenticated, (req, res) => {
  ekController.getOneRecipeById(req, res)
})
router.post('/addFavorite/:id', authHelper.isAuthenticated, (req, res) => {
  ekController.addFavorite(req, res)
})
router.post('/removeFavorite/:id', authHelper.isAuthenticated, (req, res) => {
  ekController.removeFavorite(req, res)
})
router.post('/rating/:id/:score', authHelper.isAuthenticated, (req, res) => {
  ekController.rateRecipe(req, res)
})
router.post('/filterRecipes', (req, res) =>{
  ekController.filterRecipe(req, res)
})

module.exports = router
