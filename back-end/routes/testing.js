const express = require('express')
const router = express.Router()

// const { isAuthenticated, hasRole } = require('../helper/auth')

// const pkController = require('../controllers/personalKitchenController')
const userController = require('../controllers/userController')

router.get('/getRecipes', (req, res) => {
  console.log('reached testing route 1: getting all recipes ...\n')
  console.log(recipeController.getAllRecipes())
  return res.status(200).send('Hello World!')
})

router.get('/getTags', (req, res) => {
  console.log('reached testing route: getting all tags ...\n')
  console.log(recipeController.getAllTags())
  return res.status(200).send('Hello World!') //send(req.passport.session.user)
})

router.post('/newRecipe', (req, res) => {
  console.log('reached testing route: creating a new recipes ...\n')
  console.log(req.body)

  recipeController.createNewRecipe(req.body)
  // catch error
  return res.status(200).send('Hello World!')
})

router.post('/newTag/:isCourse', (req, res) => {
  console.log('reached testing route: creating a new tag ...\n')
  console.log(req.body)

  recipeController.createNewTagAdmi(req.body, req.params.isCourse)
  return res.status(200).send('Hello World!')
})

module.exports = router

/* ***************************************************************************************** */
// example of recipe, copy this for testing post request
const recipe = {
  title: 'Test Recipe 2',
  source: { type: 'website', content: 'www.test.com' },
  courseList: ['630f7fae68ff4782b343a551'],
  description: 'This is a test recipe',
  prepTime: { hours: 0, minutes: 0 },
  serveSize: 1,
  ingredients: [{ name: 'garlic', quantity: '1', unit: 'piece' }],
  instructions: 'This is a test cooking instruction',
}

// remember to check course to be empty and assigned to 'all'
