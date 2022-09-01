const recipeController = require('../controller/recipeController')

function getPersonalKitchen() {
  const allRecipes = recipeController.getAllRecipes()
  const allTags = recipeController.getAllTags()
  const courseTag = recipeController.getCourseTag()
  return { recipes: allRecipes, tags: allTags, courses: courseTag }
}

function getOneRecipeById(id) {
  const recipe = recipeController.getRecipeById(id)
  return recipe
}

function registerNewRecipe(recipe) {
  const newRecipe = recipeController.createNewRecipe(recipe)
  return newRecipe
}

function editOldRecipe(id, recipe) {
  const updatedRecipe = recipeController.updateRecipe(id, recipe)
  return updatedRecipe
}

function tagOldRecipe(id, recipe) {
  const taggedRecipe = recipeController.tagRecipe(id, recipe)
  return taggedRecipe
}

function deleteOldRecipe(id) {
  const recipe = recipeController.deleteRecipe(id)
  return recipe
}

module.exports = {
  getPersonalKitchen,
  getOneRecipeById,
  editOldRecipe,
  tagOldRecipe,
  registerNewRecipe,
  deleteOldRecipe,
}
