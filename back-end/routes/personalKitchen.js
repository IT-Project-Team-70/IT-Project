const express = require('express')
const router = express()

// const { hasRole } = require('../helper/auth')

const pkController = require('../controllers/personalKitchenController')
const authHelper = require('../helper/authHelper')
/* ********************************************************************************************* */

router.get('/', authHelper.isAuthenticated, (req, res) => {
  pkController.getPersonalKitchen(req, res)
  // return res.status(200).send(pageData)
  // return res.status(200).send(req.passport.session.user)
})

router.get('/:id', authHelper.isAuthenticated, pkController.getOneRecipeById)

// post a new recipe into the database
router.post('/newRecipe', authHelper.isAuthenticated, pkController.registerNewRecipe)
// editing old recipes
router.post('/oldRecipe/:id', authHelper.isAuthenticated, pkController.editOldRecipe)

// delete a recipe from the database
router.delete('/:id', authHelper.isAuthenticated, pkController.deleteOldRecipe)
router.get('/category', authHelper.isAuthenticated, (req, res) => {})
router.get('/category/:id', authHelper.isAuthenticated, (req, res) => {})
router.get('/favorite', authHelper.isAuthenticated, (req, res) => {})
router.get('/favorite/:id', authHelper.isAuthenticated, (req, res) => {})

// change recipe tags, move into another category
router.post(
  '/tagRecipe/:id',
  authHelper.isAuthenticated,
  (req, res) => {}
)
module.exports = router 
