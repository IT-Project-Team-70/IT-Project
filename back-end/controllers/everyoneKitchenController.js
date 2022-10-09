const userHelper = require('../helper/userHelper')
const recipeHelper = require('../helper/recipeHelper')
const generalHelper = require('../helper/generalHelper')
const User = require('../models/user')

const { isEmpty } = require('lodash')
var formidable = require('formidable')
const form = new formidable.IncomingForm()

async function getEveryoneKitchen(req, res) {
  try {
    const user = await User.findById(req.user._id)
    const isPublic = true
    const allRecipes = await recipeHelper.getAllRecipes(isPublic)
    if (isEmpty(allRecipes)) {
      return res.status(200).send(null)
    }
    const recipes = []
    for (let i = 0; i < allRecipes.length; i++) {
      // let recipe = await Recipe.findById(allRecipes[i])
      let recipe
      if(allRecipes[i]!==null){
        recipe=allRecipes[i].toObject()
        if(user.favorites.includes(allRecipes[i]._id)){
          recipe.isfavorite=true
        }else{
          recipe.isfavorite=false
        }
        recipes.push(recipe)
      }
    }
    return res.status(200).send(recipes)
    //const sortedRecipes = recipeHelper.sortRecipesByRating(allRecipes)
    //return res.status(200).send(sortedRecipes)
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

async function getAllSortedRecipes(req, res) {
  try {
    const isPublic = true
    const allRecipes = await recipeHelper.getAllRecipes(isPublic)
    // const sortedRecipes = recipeHelper.sortRating()
  } catch (error) {
    throw new Error(error)
  }
}

async function filterRecipe(req, res) {
  try {
    const requiredTagNames = req.body.tags
    const isPublic = true
    const allRecipes = await recipeHelper.getAllRecipes(isPublic)
    let result = []
    for (let i = 0; i < allRecipes.length; i++) {
      const tagNames = allRecipes[i].courseNameList.concat(
        allRecipes[i].categoryNameList
      )
      let count = 0
      for (j in requiredTagNames) {
        if (tagNames.includes(requiredTagNames[j])) {
          count += 1
        }
      }
      if (count == requiredTagNames.length) {
        result.push(allRecipes[i])
      }
    }
    return res.status(200).send(result)
  } catch (err) {
    res.status(500).send('errors while filtering recipes')
    throw new Error(err)
  }
}

async function addFavorite(req, res) {
  try {
    if (!generalHelper.isValidObjectId(req.params.id)) {
      return res.status(404).send('invalid recipeId')
    }
    const user = await userHelper.getUserByID(req.user._id)
    const recipe = await recipeHelper.getRecipeById(req.params.id)
    if (!recipe) {
      return res.status(200).send('recipe not found')
    }
    const favorites = user.favorites
    if (!favorites.includes(req.params.id)) {
      favorites.push(recipe)
    }
    user.favorites = favorites
    await user.save()
    return res.status(200).send(user)
  } catch (err) {
    res.status(500).send('Errors while adding favourite recipes')
    throw new Error(err)
  }
}

async function removeFavorite(req, res) {
  try {
    if (!generalHelper.isValidObjectId(req.params.id)) {
      return res.status(404).send('invalid recipeId')
    }
    const user = await userHelper.getUserByID(req.user._id)
    const recipe = await recipeHelper.getRecipeById(req.params.id)
    if (!recipe) {
      return res.status(200).send('recipe not found')
    }
    const favorites = user.favorites
    if (favorites.includes(req.params.id)) {
      favorites.remove(recipe)
    }
    user.favorites = favorites
    await user.save()
    return res.status(200).send(user)
  } catch (err) {
    res.status(500).send('Errors while removing favourite recipes')
    throw new Error(err)
  }
}

async function rateRecipe(req, res) {
  try {
    if (!generalHelper.isValidObjectId(req.params.id)) {
      return res.status(404).send('invalid recipeId')
    }
    const userId = req.user._id
    const recipeId = req.params.id
    const rating = req.body.rating
    const result = await recipeHelper.rateRecipe(recipeId, userId, rating)
    return res.status(200).send(result)
  } catch (err) {
    res.status(500).send('Errors while rating recipe')
    throw new Error(err)
  }
}

async function commentRecipe(req, res) {}

module.exports = {
  getEveryoneKitchen,
  getOneRecipeById,
  filterRecipe,
  addFavorite,
  removeFavorite,
  rateRecipe,
  commentRecipe,
  getAllSortedRecipes,
}
