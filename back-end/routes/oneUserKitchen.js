const express = require('express')
const router = express.Router()

const { isAuthenticated, hasRole } = require('../helper/authHelper')
const oneUserKitchenController = require('../controllers/oneUserKitchenController')
/* ********************************************************************************************* */

router.get('/:userId', isAuthenticated, oneUserKitchenController.getOneUserKitchen)
router.get('/:userId/rejectRequest', isAuthenticated, oneUserKitchenController.rejectRequest)
/*router.get('/:id', isAuthenticated, ekController.getOneRecipeById)

router.post('/addFavorite/:id', isAuthenticated, ekController.addFavorite)
router.post('/removeFavorite/:id', isAuthenticated, ekController.removeFavorite)

router.post('/rating/:id/:score', isAuthenticated, ekController.rateRecipe)
router.post('/comment/:id', isAuthenticated, ekController.commentRecipe)
router.post('/filterRecipes', isAuthenticated, ekController.filterRecipe)*/

module.exports = router