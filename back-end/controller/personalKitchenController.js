const Recipe = require('../model/recipe')
const Tag = require('../model/tag')

// get all tags
async function getAllTags() {
  const tags = await Tag.find({})
  return tags
}

// Create a new recipe
async function createNewRecipe(recipe) {
  try {
    // create recipe and validate
    const newRecipe = new Recipe(recipe)
    const { error } = newRecipe.joiValidate(recipe)
    if (error) {
      throw new Error(error.details[0].message)
    }
    // save the recipe into the database
    const result = await newRecipe.save()
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

// Get all recipes
async function getAllRecipes() {
  try {
    const result = await Recipe.find()
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

async function getRecipeById(id) {
  try {
    const result = await Recipe.findById(id)
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

async function getRecipeByTag(tag) {}

// Update a recipe
async function updateRecipe(id, recipe) {
  const { error } = recipe.joiValidate()
  if (error) {
    throw new Error(error.details[0].message)
    return error
  }

  try {
    const result = await Recipe.findByIdAndUpdate(id, recipe, {
      new: true,
    })
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

// Delete a recipe
async function deleteRecipe(id) {
  try {
    const result = await Recipe.findByIdAndDelete(id)
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

module.exports = {
  getAllTags,
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
}
