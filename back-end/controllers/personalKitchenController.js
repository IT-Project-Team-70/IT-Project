const recipeHelper = require('../helper/recipeHelper')
const generalHelper = require('../helper/generalHelper')
const userHelper = require('../helper/userHelper')
const commentHelper = require('../helper/commentHelper')

var formidable = require('formidable')
const form = new formidable.IncomingForm()
// const { isObjectIdOrHexString } = require('mongoose')

/* ********************************************************************* */
async function getPersonalKitchen(req, res) {
  try {
    const allRecipes = await recipeHelper.getUserRecipes(req.user._id)
    const allTags = await recipeHelper.getAllTags()
    const courseTags = await recipeHelper.getCourseTags()
    const result = { recipes: allRecipes, tags: allTags, courses: courseTags }
    return res.status(200).send(result)
  } catch (err) {
    res.status(500).send('Load the Personal Kitchen Page  unsuccessfully')
    throw new Error(err)
  }
}
async function getAdminKitchen(req, res) {
  try {
    const publicRecipes = await recipeHelper.getAllRecipes(true)
    return res.status(200).send({recipes: publicRecipes})
  } catch (err) {
    res.status(500).send('Get the public recipes unsuccessfully')
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
    const comments = await commentHelper.getCommentsFromRecipe(id)
    if (recipe === null) {
      return res.status(404).send('Recipe not found')
    }
    return res.status(200).send({ recipe, comments })
  } catch (err) {
    res.status(500).send('Get the recipe unsuccessfully')
    throw new Error(err)
  }
}

async function getRecipesByTag(req, res) {
  try {
    const tag = req.params.tag
    const recipes = await recipeHelper.getRecipesByTag(tag, req.user._id)
    return res.status(200).send(recipes)
  } catch (err) {
    res.status(500).send('Get the recipe by tag unsuccessfully')
    throw new Error(err)
  }
}

async function getUserFavorite(req, res) {
  try {
    const user = await userHelper.getUserByID(req.user._id)
    const favoriteRecipes = []
    if (user.favorites !== null) {
      for (let i in user.toJSON().favorites) {
        let recipe = await recipeHelper.getRecipeById(
          user.toJSON().favorites[i].toJSON()
        )
        if (recipe !== null) {
          recipe = recipe.toObject()
          if (user.favorites.includes(user.toJSON().favorites[i].toJSON())) {
            recipe.isfavorite = true
          } else {
            recipe.isfavorite = false
          }
        }
        favoriteRecipes.push(recipe)
      }
    }
    return res.status(200).send({ recipes: favoriteRecipes })
  } catch (err) {
    res.status(500).send('Get the user favorite recipes unsuccessfully')
    throw new Error(err)
  }
}

async function registerNewRecipe(req, res) {
  try {
    form.parse(req, (err, fields) => {
      if (err) {
        res.status(500).send('Register the new recipe unsuccessfully')
      }
      // console.log(typeof fields);

      //iterate through object, convert all value back to object
      fields = Object.keys(fields).reduce((prev, curr) => {
        return { ...prev, [curr]: JSON.parse(fields[curr]) }
      }, {})
      fields = { ...fields, userId: req.user._id }
      recipeHelper.createNewRecipe(fields).then((value) => {
        return res.status(200).send(value)
      })
    })
  } catch (err) {
    res.status(500).send('Register the new recipe unsuccessfully')
    throw new Error(err)
  }
}

async function editOldRecipe(req, res) {
  try {
    const id = req.params.id
    if (recipeHelper.getRecipeById(id) === null) {
      return res.status(404).send('Recipe not found')
    }
    form.parse(req, (err, fields) => {
      if (err) {
        res.status(500).send('Register the new recipe unsuccessfully')
      }
      // console.log(typeof fields);

      //iterate through object, convert all value back to object
      fields = Object.keys(fields).reduce((prev, curr) => {
        return { ...prev, [curr]: JSON.parse(fields[curr]) }
      }, {})
      fields = { ...fields, userId: req.user._id }
      recipeHelper.updateRecipe(id, fields).then((value) => {
        return res.status(200).send(value)
      })
    })
  } catch (err) {
    res.status(500).send('Update the recipe unsuccessfully')
    throw new Error(err)
  }
}

async function tagOldRecipe(req, res) {
  try {
    const id = req.body.id
    const recipe = req.body.recipe
    const taggedRecipe = await recipeHelper.tagRecipe(id, recipe)
    return res.status(200).send(taggedRecipe)
  } catch (err) {
    res.status(500).send('Tag the recipe successfully')
    throw new Error(err)
  }
}

// modified to asynchornous
function deleteOldRecipe(req, res) {
  try {
    const id = req.params.id
    const recipe = recipeHelper.deleteRecipe(id)
    if (recipe === null) {
      return res.status(404).send('Recipe not found')
    }
    return res.status(200).send(recipe)
  } catch (err) {
    res.status(500).send('Delete the recipe successfully')
    throw new Error(err)
  }
}

module.exports = {
  getPersonalKitchen,
  getAdminKitchen,
  getOneRecipeById,
  getRecipesByTag,
  getUserFavorite,
  editOldRecipe,
  tagOldRecipe,
  registerNewRecipe,
  deleteOldRecipe,
}
