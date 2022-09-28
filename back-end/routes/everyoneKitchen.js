const express = require('express')
const router = express.Router()

const { isAuthenticated, hasRole } = require('../helper/authHelper')
const ekController = require('../controllers/everyoneKitchenController')

/* ********************************************************************************************* */

router.get('/', isAuthenticated, ekController.getEveryoneKitchen)
router.get('/:id', isAuthenticated, ekController.getOneRecipeById)

router.post('/addFavorite/:id', isAuthenticated, ekController.addFavorite)
router.post('/removeFavorite/:id', isAuthenticated, ekController.removeFavorite)

router.post('/rating/:id/:score', isAuthenticated, ekController.rateRecipe)
router.post('/comment/:id', isAuthenticated, ekController.commentRecipe)

module.exports = router
