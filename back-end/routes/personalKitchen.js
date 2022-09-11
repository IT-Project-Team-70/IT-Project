const express = require('express')
const router = express.Router()

// const { hasRole } = require('../helper/auth')

const pkController = require('../controllers/personalKitchenController')

/* ********************************************************************************************* */
router.get('/', (req, res) => {
  // res.redirect('/personalKitchen/home')
  return res.status(200).send(req.passport.session.user)
})

router.get('/personalKitchen', (req, res) => {
  const pageData = pkController.getPersonalKitchen()
  return res.status(200).send(pageData)
})
router.get('personalKitchen/home', (req, res) => {
  // redirect to personal Kitchen dashboard
  res.redirect('/personalKitchen')
})

router.get('/personalKitchen/:id', pkController.getOneRecipeById)

// post a new recipe into the database
router.post('/personalKitchen/newRecipe', pkController.registerNewRecipe)

// editing old recipes
router.post('/personalKitchen/oldRecipe/:id', pkController.editOldRecipe)

// delete a recipe from the database
router.delete('/personalKitchen/:id', pkController.deleteOldRecipe)

router.get('/personalKitchen/category', (req, res) => {})
router.get('/personalKitchen/category/:id', (req, res) => {})

router.get('/personalKitchen/favorite', (req, res) => {})
router.get('/personalKitchen/favorite/:id', (req, res) => {})


// change recipe tags, move into another category
router.post(
  '/personalKitchen/tagRecipe/:id',
  // isAuthenticated,
  (req, res) => {}
)

module.exports = router
