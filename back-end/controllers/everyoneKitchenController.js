const Recipe = require("../models/recipe");
const recipeHelper = require("../helper/recipeHelper");
var formidable = require("formidable");
const { isEmpty } = require("lodash");
const { all } = require("../routes/personalKitchen");
const form = new formidable.IncomingForm();

async function getAllSortedRecipes(req, res){
  try{
    const allRecipes = await recipeHelper.getAllRecipes()
    const sortedRecipes = recipeHelper.sortRating()
  }
  catch(error){
    throw new Error(error)
  }
}

async function filterRecipe(req, res) {
  try {
    const requiredTagNames = req.body.tags; 
    const allRecipes = await recipeHelper.getAllRecipes();
    let result = [];
    for(let i = 0; i < allRecipes.length; i++){
        const tagNames = allRecipes[i].tagNameList;
        let count = 0;
      for (j in requiredTagNames){
        if (tagNames.includes(requiredTagNames[j])){
          count+=1;
        }
      } 
      if (count == requiredTagNames.length){
        result.push(allRecipes[i])
      }
      }
      return res.status(200).send(result);
  }
  catch (err) {
    res.status(500).send("errors while filtering recipes");
    throw new Error(err)
  }
}
async function getEveryoneKitchen() {}

async function getOneRecipeById(req, res) {}

async function addFavorite(req, res) {}

async function removeFavorite(req, res) {}

async function rateRecipe(req, res) {}
async function commentRecipe(req, res) {}

module.exports = {
  getEveryoneKitchen,
  getOneRecipeById,
  addFavorite,
  removeFavorite,
  rateRecipe,
  commentRecipe,
  filterRecipe,
  getAllSortedRecipes
}
