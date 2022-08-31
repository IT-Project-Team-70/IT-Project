const express = require('express')
const router = express.Router()

// const { isAuthenticated, hasRole } = require('../helper/auth')

const User = require('../model/user')
const Recipe = require('../model/recipe')
const pkController = require('../controller/personalKitchenController')
const userController = require('../controller/userController')

router.get('/', (req, res) => {
  console.log('reached testing route 1: getting all recipes ...\n')
  console.log(pkController.getAllRecipes())
  return res.status(200).send('Hello World!')
})

router.get('/tag', (req, res) => {
  console.log('reached testing route: getting all tags ...\n')
  console.log(pkController.getAllTags())
  return res.status(200).send('Hello World!') //send(req.passport.session.user)
})

router.post('/', (req, res) => {
  console.log('reached testing router 2: creating a new recipes ...\n')
  console.log(req.body)

  pkController.createNewRecipe(req.body) // catch error
  return res.status(200).send('Hello World!')
})

module.exports = router

// const recipe = {
//   title: 'Test Recipe',
//   source: { type: 'website', content: 'www.test.com' },
//   course: { name: 'Main' },
//   description: 'This is a test recipe',
//   prepTime: { hours: 0, minutes: 0 },
//   serveSize: 1,
//   ingredients: [{ name: 'garlic', quantity: '1', unit: 'piece' }],
//   instructions: 'This is a test cooking instruction',
// }
