const express = require('express')
const router = express.Router()

// const { hasRole } = require('../helper/auth')

const pkController = require('../controllers/personalKitchenController')

/* ********************************************************************************************* */
router.get('/', (req, res) => {
  pkController.getPersonalKitchen(req, res)
  // return res.status(200).send(pageData)
  // return res.status(200).send(req.passport.session.user)
})
router.get('/home', (req, res) => {
  // redirect to personal Kitchen dashboard
  res.redirect('/')
})
router.get('/:id', pkController.getOneRecipeById)

// post a new recipe into the database
router.post('/newRecipe', pkController.registerNewRecipe)
// editing old recipes
router.post('/oldRecipe/:id', pkController.editOldRecipe)

// delete a recipe from the database
router.delete('/:id', pkController.deleteOldRecipe)

router.get('/category', (req, res) => {})
router.get('/category/:id', (req, res) => {})

router.get('/favorite', (req, res) => {})
router.get('/favorite/:id', (req, res) => {})

// change recipe tags, move into another category
router.post(
  '/tagRecipe/:id',
  // isAuthenticated,
  (req, res) => {}
)

module.exports = router
