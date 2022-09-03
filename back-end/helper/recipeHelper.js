const Recipe = require('../models/recipe')
const Tag = require('../models/tag')

// get all tags
async function getAllTags() {
  try {
    const result = await Tag.find()
    return result
  } catch (err) {
    throw new Error(err)
  }
}

async function getCourseTag() {
  try {
    const result = await Tag.findOne({ isCourse: true })
    return result
  } catch (err) {
    throw new Error(err)
  }
}

// create a new tag, store in database and return the tag
async function createNewTag(tag) {
  try {
    const existedTag = await Tag.findOne({ name: tag.name })
    if (existedTag) {
      return existedTag
    }
    tag.userCreated = true
    const newTag = new Tag(tag)
    const { error } = newTag.joiValidate()
    if (error) {
      throw new Error(error.details[0].message)
    }
    await newTag.save()
    return await Tag.findOne({ name: tag.name })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

async function createNewTagAdmi(tag, isCourse) {
  try {
    const existedTag = await Tag.findOne({ name: tag.name })
    if (existedTag) {
      return existedTag
    }
    tag.userCreated = false
    tag.isCourse = isCourse
    const newTag = new Tag(tag)
    const { error } = newTag.joiValidate()
    if (error) {
      throw new Error(error.details[0].message)
    }
    await newTag.save()
    return await Tag.findOne({ name: tag.name })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

async function findTag(tag) {
  try {
    const result = await Tag.findOne({ name: tag.name })
    return result
  } catch (err) {
    throw new Error(err)
  }
}

// Get all recipes
async function getAllRecipes(req, res) {
  try {
    const result = await Recipe.find()
    return res.status(200).send(result)
  } catch (err) {
    res.status(500).send("Get all Recipes unsuccessfully")
    throw new Error(err)
  }
}

async function tagRecipe(id, recipe) {}

async function getRecipeById(req, res) {
  try {
    const result = await Recipe.findById(id)
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

async function getRecipeByTag(tag) {}

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

// Update a recipe
async function updateRecipe(id, recipe) {
  const { error } = recipe.joiValidate()
  if (error) {
    throw new Error(error.details[0].message)
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
  getCourseTag,
  createNewTag,
  createNewTagAdmi,
  findTag,
  tagRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipeByTag,
  createNewRecipe,
  updateRecipe,
  deleteRecipe,
}
