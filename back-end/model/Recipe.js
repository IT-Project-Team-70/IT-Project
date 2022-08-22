const { default: mongoose } = require('mongoose')
const validation = require('./validation')

/* ***************************************************************************************** */
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String },
})

const sourceSchema = new mongoose.Schema({
  type: { type: String, required: true, default: 'URL' },
  content: { type: String, required: true },
})

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, required: true },
})

const prepTimeSchema = new mongoose.Schema({
  hours: { type: Number },
  minutes: { type: Number },
})

const stepsSchema = new mongoose.Schema({
  step: { type: Number, required: true, min: 1, max: 30 },
  description: { type: String, required: true, minlength: 1, maxlength: 255 },
  ingredients: [ingredientSchema],
  image: { type: imageSchema },
})

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 50 },
  source: { type: sourceSchema, required: true },

  tagList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
    enum: [
      { name: 'Appetizer' },
      { name: 'Main' },
      { name: 'Side' },
      { name: 'Dessert' },
      { name: 'Other' },
      { name: 'All' },
      { name: 'Breakfast' },
      { name: 'Lunch' },
      { name: 'Dinner' },
    ],
    default: 'All',
  },

  image: { type: imageSchema, required: true },
  description: { type: String, required: true, minlength: 1, maxlength: 255 },
  notes: { type: String, required: true, minlength: 1, maxlength: 255 },

  prepTime: { type: prepTimeSchema, required: true },
  serveSize: { type: Number, required: true },
  ingredients: { type: [ingredientSchema], required: true },

  instructions: { type: String, required: true, minlength: 1, maxlength: 255 },
  steps: { type: [stepsSchema] },
})

recipeSchema.methods.joiValidate = function (recipe) {
  return validation.validateRecipe(recipe)
}

const RecipeModel = mongoose.model('Recipe', recipeSchema)

/* ***************************************************************************************** */

// Create a new recipe
async function createNewRecipe(recipe) {
  const { error } = recipe.joiValidate()
  if (error) {
    throw new Error(error.details[0].message)
    return error
  }

  try {
    const newRecipe = new RecipeModel(recipe)
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
    const result = await RecipeModel.find()
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

async function getRecipeById(id) {
  try {
    const result = await RecipeModel.findById(id)
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
    const result = await RecipeModel.findByIdAndUpdate(id, recipe, {
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
    const result = await RecipeModel.findByIdAndDelete(id)
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

/* ***************************************************************************************** */

module.exports = {
  Recipe: RecipeModel,
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
}
