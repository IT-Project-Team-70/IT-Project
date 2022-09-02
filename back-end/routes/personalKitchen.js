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

router.get('/personalKitchen/:id', (req, res) => {
  const recipe = pkController.getOneRecipeById(req.params.id)
  if (recipe === null) {
    return res.status(404).send('Recipe not found')
  }
  return res.status(200).send(recipe)
})

router.get('/personalKitchen/category', (req, res) => {})
router.get('/personalKitchen/category/:id', (req, res) => {})

router.get('/personalKitchen/favorite', (req, res) => {})
router.get('/personalKitchen/favorite/:id', (req, res) => {})

// post a new recipe into the database
router.post('/personalKitchen/newRecipe', (req, res) => {
  const newRecipe = pkController.registerNewRecipe(req.body)
  return res.status(200).send(newRecipe)
})
// editing old recipes
router.post('/personalKitchen/oldRecipe/:id', (req, res) => {
  const updatedRecipe = pkController.editOldRecipe(req.params.id, req.body)
  return res.status(200).send(updatedRecipe)
})
// change recipe tags, move into another category
router.post(
  '/personalKitchen/tagRecipe/:id',
  // isAuthenticated,
  (req, res) => {}
)

// delete a recipe from the database
router.delete('/personalKitchen/:id', (req, res) => {
  const recipe = pkController.deleteOldRecipe(req.params.id)
  if (recipe === null) {
    return res.status(404).send('Recipe not found')
  }
  return res.status(200).send(recipe)
})

module.exports = router
