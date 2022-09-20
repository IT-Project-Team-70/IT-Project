const express = require('express')
const router = express()

const { hasRole, isAuthenticated } = require('../helper/authHelper')

const pkController = require('../controllers/personalKitchenController')

/* ********************************************************************************************* */

router.get('/', isAuthenticated, (req, res) => {
  pkController.getPersonalKitchen(req, res)
  // return res.status(200).send(pageData)
  // return res.status(200).send(req.passport.session.user)
})

router.get('/:id', isAuthenticated, pkController.getOneRecipeById)

// post a new recipe into the database
router.post('/newRecipe', isAuthenticated, pkController.registerNewRecipe)
// editing old recipes
router.post('/oldRecipe/:id', isAuthenticated, pkController.editOldRecipe)

// delete a recipe from the database
router.delete('/:id', isAuthenticated, pkController.deleteOldRecipe)
router.get('/category', isAuthenticated, (req, res) => {})
router.get('/category/:id', isAuthenticated, (req, res) => {})
router.get('/favorite', isAuthenticated, (req, res) => {})
router.get('/favorite/:id', isAuthenticated, (req, res) => {})

// change recipe tags, move into another category
router.post('/tagRecipe/:id', isAuthenticated, (req, res) => {})
module.exports = router
