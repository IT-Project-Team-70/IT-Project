// const fs = require('fs')

const Recipe = require('../models/recipe')
const Tag = require('../models/tag')

/* ***************************************************************************************** */

// Get all recipes
async function getAllRecipes(req, res) {
  try {
    const result = await Recipe.find()
    return result
  } catch (err) {
    // res.status(500).send('Get all Recipes unsuccessfully')
    console.log(err)
    throw new Error(err)
  }
}

async function tagRecipe(id, recipe) {}

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

// Create a new recipe
async function createNewRecipe(recipe) {
  try {
    //iterate through object, convert all value back to object
    recipe=Object.keys(recipe).reduce((prev,curr)=>
     { 
      // console.log(curr,recipe[curr])
      return {...prev, [curr]: JSON.parse(recipe[curr])}},{})

    // assign tags to the recipe
    const newTagList = []
    for (let i = 0; i < recipe.tagList.length; i++) {
      const tag = await findTag(recipe.tagList[i])
      if (tag) {
        newTagList.push(tag)
      } else {
        const newTag = await createNewTag(recipe.tagList[i])
        newTagList.push(newTag)
      }
    }
    recipe.tagList = newTagList

    // assign course tag to the recipe
    const newCourseList = []
    for (let i = 0; i < recipe.courseList.length; i++) {
      const course = await findTag(recipe.courseList[i])
      if (course) {
        newCourseList.push(course)
      } else {
        throw new Error('Course tag is not found')
      }
    }
    recipe.courseList = newCourseList

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
    // tag.userCreated = true
    // tag.isCourse = false
    // const newTag = new Tag(tag)
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
    // tag.userCreated = false
    // tag.isCourse = isCourse
    // const newTag = new Tag(tag)
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

module.exports = {
  tagRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipeByTag,
  createNewRecipe,
  updateRecipe,
  deleteRecipe,

  getAllTags,
  getCourseTags,
  findTag,
  createNewTag,
  createNewTagAdmi,
}