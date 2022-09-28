// const fs = require('fs')

const User = require('../models/user')
const Recipe = require('../models/recipe')
const Tag = require('../models/tag')

/* ***************************************************************************************** */

// Get all recipes
async function getAllRecipes(isPublic) {
  try {
    const result = await Recipe.find({ isPublic })
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

async function getUserRecipes(userId) {
  try {
    const user = await User.findById(userId)

    const recipes = []
    for (let i = 0; i < user.recipes.length; i++) {
      const recipe = await Recipe.findById(user.recipes[i])
      recipes.push(recipe)
    }
    return recipes
  } catch (err) {
    // res.status(500).send('Get all Recipes unsuccessfully')
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

async function getRecipesByTag(tag, userId) {
  try {
    const user = await User.findById(userId)
    const recipes = user.recipes

    const result = []
    for (let i = 0; i < recipes.length; i++) {
      const recipe = await Recipe.findById(recipes[i])
      if (recipe.tagNames.includes(tag)) {
        result.push(recipe)
      }
    }
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

async function tagRecipe(id, recipe) {}
// Create a new recipe
async function createNewRecipe(recipe) {
  try {
    // assign tags to the recipe
    const newTagList = []
    const categoryNameList = []
    for (let i = 0; i < recipe.tagList.length; i++) {
      const tag = await findTag(recipe.tagList[i])
      if (tag) {
        newTagList.push(tag)
        categoryNameList.push(tag.name)
      } else {
        const newTag = await createNewTag(recipe.tagList[i])
        newTagList.push(newTag)
        categoryNameList.push(tag.name)
      }
    }
    recipe.tagList = newTagList
    recipe.categoryNameList = categoryNameList

    // assign course tag to the recipe
    const newCourseList = []
    const courseNameList = []
    for (let i = 0; i < recipe.courseList.length; i++) {
      const course = await findTag(recipe.courseList[i])
      if (course) {
        newCourseList.push(course)
        courseNameList.push(course.name)
      } else {
        throw new Error('Course tag is not found')
      }
    }
    recipe.courseList = newCourseList
    recipe.courseNameList = courseNameList

    // create recipe and validate
    const newRecipe = new Recipe(recipe)
    const { error } = newRecipe.joiValidate(recipe)
    if (error) {
      throw new Error(error.details[0].message)
    }
    // save the recipe into the recipe & user database
    const result = await newRecipe.save()
    const user = await User.findById(recipe.userId)
    user.recipes.push(result._id)
    await user.save()
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

/* ***************************************************************************************** */

// get all tags
async function getAllTags() {
  try {
    const result = await Tag.find({ isCourse: false })
    return result
  } catch (err) {
    throw new Error(err)
  }
}

// get all courses tags
async function getCourseTags() {
  try {
    const result = await Tag.find({ isCourse: true })
    return result
  } catch (err) {
    throw new Error(err)
  }
}

async function findTag(tag) {
  try {
    const result = await Tag.findOne({ name: tag }) // tag.name
    return result
  } catch (err) {
    throw new Error(err)
  }
}

// create a new tag, store in database and return the tag
async function createNewTag(tag) {
  try {
    const existedTag = await Tag.findOne({ name: tag }) // tag.name
    if (existedTag) {
      return existedTag
    }
    const newTag = new Tag({ name: tag, userCreated: true, isCourse: false })
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
    const existedTag = await Tag.findOne({ name: tag }) // tag.name
    if (existedTag) {
      return existedTag
    }

    const newTag = new Tag({ name: tag, userCreated: false, isCourse })
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

/* ***************************************************************************************** */
async function rateRecipe(recipeId, userId, rate) {
  try {
    const recipe = await Recipe.findById(recipeId)
    if (!recipe) throw new Error('Recipe not found')

    const rating = { user: userId, rate }
    recipe.ratingList.push(rating)

    // calculate the average rating
    let sum = 0
    for (let i = 0; i < recipe.ratingList.length; i++) {
      sum += recipe.ratingList[i].rate
    }
    recipe.averageRating = sum / recipe.ratingList.length

    const result = await recipe.save()
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

function partition(arr, start, end) {
  // Taking the last element as the pivot
  const pivotValue = arr[end]
  let pivotIndex = start
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      // Swapping elements
      ;[arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]
      // Moving to next element
      pivotIndex++
    }
  }
  // Putting the pivot value in the middle
  ;[arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
  return pivotIndex
}

function sortRating(recipes) {
  // Base case or terminating case
  if (start >= end) {
    return
  }
  // Returns pivotIndex
  let index = partition(arr, start, end)
  // Recursively apply the same logic to the left and right subarrays
  quickSort(arr, start, index - 1)
  quickSort(arr, index + 1, end)
}

function sortRecipesByRating(recipes) {
  // const ratings =
}
/* ***************************************************************************************** */

module.exports = {
  getAllRecipes,
  getUserRecipes,
  getRecipeById,
  getRecipesByTag,
  createNewRecipe,
  tagRecipe,
  updateRecipe,
  deleteRecipe,

  getAllTags,
  getCourseTags,
  findTag,
  createNewTag,
  createNewTagAdmi,
  sortRecipesByRating,
  rateRecipe,
}
