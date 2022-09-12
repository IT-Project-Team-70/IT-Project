const express = require('express')
const router = express()
//const {isAuthenticated }= require('../controllers/authController')
// const { hasRole } = require('../helper/auth')

const pkController = require('../controllers/personalKitchenController')

/* ********************************************************************************************* */
function isAuthenticated(req, res, next){
  if(!req.isAuthenticated()){
    return res.status(401).send('Please login first')
  }
  else{
    console.log(req.user)
   return next()
  }
}
router.get('/personal_kitchen', isAuthenticated, pkController.getPersonalKitchen)

router.get('/personal_kitchen/home', isAuthenticated, (req, res) => {
  // redirect to personal Kitchen dashboard
  res.redirect('/personalKitchen')
})

router.get('/personal_kitchen/:id', isAuthenticated, pkController.getOneRecipeById)

// post a new recipe into the database
router.post('/personal_kitchen/newRecipe', isAuthenticated, pkController.registerNewRecipe)

// editing old recipes
router.post('/personal_kitchen/oldRecipe/:id', isAuthenticated, pkController.editOldRecipe)

// delete a recipe from the database
router.delete('/personal_kitchen/:id', isAuthenticated, pkController.deleteOldRecipe)

router.get('/personal_kitchen/category', isAuthenticated, (req, res) => {})
router.get('/personal_kitchen/category/:id', isAuthenticated, (req, res) => {})

router.get('/personal_kitchen/favorite', isAuthenticated, (req, res) => {})
router.get('/personal_kitchen/favorite/:id', isAuthenticated, (req, res) => {})


// change recipe tags, move into another category
router.post(
  '/personalKitchen/tagRecipe/:id',
  isAuthenticated,
  (req, res) => {}
)

module.exports = router
