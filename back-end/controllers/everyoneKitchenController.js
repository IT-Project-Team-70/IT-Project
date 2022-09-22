const Recipe = require("../models/recipe");
const recipeHelper = require("../helper/recipeHelper");
var formidable = require("formidable");
const { isEmpty } = require("lodash");
const form = new formidable.IncomingForm();


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
    const requiredTagNames = req.body.tags; 
    const allRecipes = await recipeHelper.getAllRecipes();
    let result = [];
    for (i = 0; i < allRecipes.length; i++) {
      const recipe = allRecipes[i];
      const tagNames = recipe.tagNames;
      if (requiredTagNames in tagNames) {
        result.push(recipe);
      }
    }
    if (result.length == 0) {
      return res.status(200).send(null);
    }
    return res.status(200).send(result);
  } catch (err) {
    res.status(500).send("errors while filtering recipes");
  }
}

module.exports = { filterRecipe };
