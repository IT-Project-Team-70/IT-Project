const express = require('express')
const router = express.Router()

const fs = require('fs')

// const { isAuthenticated, hasRole } = require('../helper/authHelper')

const recipeHelper = require('../helper/recipeHelper')

router.get('/getRecipes', (req, res) => {
  console.log('reached testing route 1: getting all recipes ...\n')
  console.log(recipeHelper.getAllRecipes())
  return res.status(200).send('Hello World!')
})

router.get('/getTags', (req, res) => {
  console.log('reached testing route: getting all tags ...\n')
  console.log(recipeHelper.getAllTags())
  return res.status(200).send('Hello World!') //send(req.passport.session.user)
})

router.get('/getCourses', (req, res) => {
  console.log('reached testing route: getting all tags ...\n')
  recipeHelper.getCourseTags().then(function (result) {
    return res.status(200).send(result) //send(req.passport.session.user)
  })
})

router.post('/newRecipe', (req, res) => {
  console.log('reached testing route: creating a new recipes ...\n')
  console.log(req.body)

  recipeHelper.createNewRecipe(req.body)
  // catch error
  return res.status(200).send('Hello World!')
})

router.post('/admi/newTag/:isCourse', (req, res) => {
  console.log('reached testing route: creating a new tag ...\n')
  console.log(req.body)

  recipeHelper.createNewTagAdmi(req.body, req.params.isCourse)
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
