const recipeHelper = require('../helper/recipeHelper')
var formidable = require('formidable');
const form = new formidable.IncomingForm();

async function getPersonalKitchen(req, res) {
  try {
    const allRecipes = await recipeHelper.getAllRecipes(req, res)
    const allTags = await recipeHelper.getAllTags()
    const courseTags = await recipeHelper.getCourseTags()
    const result = { recipes: allRecipes, tags: allTags, courses: courseTags }
    return res.status(200).send(result)
  } catch (err) {
    res.status(500).send('Load the Personal Kitchen Page  unsuccessfully')
    throw new Error(err)
  }
}

async function getOneRecipeById(req, res) {
  try {
    const id = req.params.id
    console.log(id)
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

async function registerNewRecipe(req, res) {
  try {
     form
    .parse(req, (err, fields ) => {
        if(err){
      res.status(500).send('Register the new recipe unsuccessfully')
        }
        // console.log(typeof fields);

      recipeHelper.createNewRecipe(fields).then((value)=>{
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
    const id = req.body.id
    const recipe = req.body.recipe
    const updatedRecipe = await recipeHelper.updateRecipe(id, recipe)
    if (updatedRecipe === null) {
      return res.status(404).send('Recipe not found')
    }
    return res.status(200).send(updatedRecipe)
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
    const id = req.body.id
    const recipe = recipeHelper.deleteRecipe(id)
    if (recipe === null) {
      return res.status(404).send('Recipe not found')
    }
    return recipe
  } catch (err) {
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
