const recipeHelper = require('../helper/recipeHelper')
var formidable = require('formidable')
const form = new formidable.IncomingForm()

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
}
