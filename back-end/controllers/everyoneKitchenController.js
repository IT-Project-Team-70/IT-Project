const userHelper = require('../helper/userHelper')
const recipeHelper = require('../helper/recipeHelper')
const generalHelper = require('../helper/generalHelper')

const { isEmpty } = require('lodash')
var formidable = require('formidable')
const form = new formidable.IncomingForm()

async function getEveryoneKitchen(req, res) {
  try {
    const isPublic = true
    const allRecipes = await recipeHelper.getAllRecipes(isPublic)
    if (isEmpty(allRecipes)) {
      return res.status(200).send(null)
    }
    return res.status(200).send(allRecipes)
  } catch (err) {
    res.status(500).send('errors while getting all recipes')
    throw new Error(err)
  }
}

async function getOneRecipeById(req, res) {
  try {
    const id = req.params.id
    if (!generalHelper.isValidObjectId(id)) {
      return res.status(404).send('Invalid Recipe Id')
    }
    const recipe = await recipeHelper.getRecipeById(id)
    if (recipe === null) {
      return res.status(404).send('Recipe not found')
    }
    return res.status(200).send(recipe)
  } catch (err) {
    res.status(500).send('Get the recipe unsuccessfully')
    throw new Error(err)
  }
}

async function addFavorite(req, res) {
  try {
    const recipeId = req.params.id
    if (!generalHelper.isValidObjectId(recipeId)) {
      return res.status(404).send('Invalid Recipe Id')
    }
    const userId = req.passport.session.user._id
    const user = await userHelper.getUserById(userId)
    user.favorites.push(recipeId)
    await user.save()

    return res.status(200).send('Add the recipe to favorite successfully')
  } catch (err) {
    res.status(500).send('Add the recipe to favorite unsuccessfully')
    throw new Error(err)
  }
}

async function removeFavorite(req, res) {
  try {
    const recipeId = req.params.id
    if (!generalHelper.isValidObjectId(recipeId)) {
      return res.status(404).send('Invalid Recipe Id')
    }
    const userId = req.passport.session.user._id
    const user = await userHelper.getUserById(userId)
    user.favorites.pull(recipeId)
    await user.save()

    return res.status(200).send('Remove the recipe from favorite successfully')
  } catch (err) {
    res.status(500).send('Remove the recipe from favorite unsuccessfully')
    throw new Error(err)
  }
}

async function rateRecipe(req, res) {}
async function commentRecipe(req, res) {}

/*async function getAllSortedRecipes(req, res){
  try{
    const allRecipes = await recipeHelper.getAllRecipes()
    const sortedRecipes = recipeHelper.sor
  }
  catch(error){
  }
}*/

async function filterRecipe(req, res) {
  try {
    const requiredTagNames = req.body.tags
    const allRecipes = await recipeHelper.getAllRecipes()
    let result = []
    for (i = 0; i < allRecipes.length; i++) {
      const recipe = allRecipes[i]
      const tagNames = recipe.tagNames
      if (requiredTagNames in tagNames) {
        result.push(recipe)
      }
    }
    if (result.length == 0) {
      return res.status(200).send(null)
    }
    return res.status(200).send(result)
  } catch (err) {
    res.status(500).send('errors while filtering recipes')
  }
}

module.exports = {
  getEveryoneKitchen,
  getOneRecipeById,
  addFavorite,
  removeFavorite,
  rateRecipe,
  commentRecipe,
  filterRecipe,
}
