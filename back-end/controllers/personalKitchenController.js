const recipeHelper = require('../helper/recipeHelper')

function getPersonalKitchen(req, res) {
  try{
    const allRecipes = recipeHelper.getAllRecipes()
    const allTags = recipeHelper.getAllTags()
    const courseTag = recipeHelper.getCourseTag()
    const result = { recipes: allRecipes, tags: allTags, courses: courseTag }
    return res.status(200).send(result)
  }
  catch(err){
    res.status(500).send('Load the Personal Kitchen Page  unsuccessfully')
    throw new Error(err)
  }
}

function getOneRecipeById(req, res){
  try{
    const id = req.body.id
    const recipe = recipeHelper.getRecipeById(id)
    if (recipe === null) {
      return res.status(404).send('Recipe not found')
    }
    return res.status(200).send(recipe)
  }
  catch(err){
    res.status(500).send('Get the recipe unsuccessfully')
    throw new Error(err)
  }
}

function registerNewRecipe(req, res){
  try{
    const recipe = req.body.recipe
    const newRecipe = recipeHelper.createNewRecipe(recipe)
    return res.status(200).send(newRecipe)
  }
  catch(err){
    res.status(500).send('Register the new recipe unsuccessfully')
    throw new Error(err)
  }
}

function editOldRecipe(req, res) {
  try{
    const id = req.body.id
    const recipe = req.body.recipe
    const updatedRecipe = recipeHelper.updateRecipe(id, recipe)
    if (updatedRecipe === null) {
      return res.status(404).send('Recipe not found')
    }
    return res.status(200).send(updatedRecipe)
  }
  catch(err){
    res.status(500).send('Update the recipe unsuccessfully')
    throw new Error(err)
  }
}

function tagOldRecipe(req, res) {
  try{
    const id = req.body.id
    const recipe = req.body.recipe
    const taggedRecipe = recipeHelper.tagRecipe(id, recipe)
    return res.status(200).send(taggedRecipe)
  }
  catch(err){
    res.status(500).send('Tag the recipe successfully')
    throw new Error(err)
  }
}

function deleteOldRecipe(req, res) {
  try{
    const id = req.body.id
    const recipe = recipeHelper.deleteRecipe(id)
    if (recipe === null) {
      return res.status(404).send('Recipe not found')
    }
    return recipe
  }
  catch(err){
    res.status(500).send('Delete the recipe successfully')
    throw new Error(err)
  }
}

module.exports = {
  getPersonalKitchen,
  getOneRecipeById,
  editOldRecipe,
  tagOldRecipe,
  registerNewRecipe,
  deleteOldRecipe,
}
