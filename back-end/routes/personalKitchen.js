const express = require('express')
const router = express()

const { hasRole, isAuthenticated } = require('../helper/authHelper')

const pkController = require('../controllers/personalKitchenController')

/* ********************************************************************************************* */

router.get('/', isAuthenticated, pkController.getPersonalKitchen)
router.get('/:id', isAuthenticated, pkController.getOneRecipeById)
router.get('/category/:tag', isAuthenticated, pkController.getRecipesByTag)
router.get('/favorite', isAuthenticated, pkController.getUserFavorite)
// router.get('/favorite/:id', isAuthenticated, (req, res) => {})

// post a new recipe into the database
router.post('/newRecipe', isAuthenticated, pkController.registerNewRecipe)
// editing old recipes
router.post('/editOldRecipe/:id', isAuthenticated, pkController.editOldRecipe)
// change recipe tags, move into another category
router.post('/tagRecipe/:id', isAuthenticated, pkController.tagOldRecipe)

// delete a recipe from the database
router.delete('/:id', isAuthenticated, pkController.deleteOldRecipe)

module.exports = router
