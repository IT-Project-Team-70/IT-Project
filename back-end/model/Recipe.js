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
  // course: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Tag',
  //   required: true,
  //   enum: [
  //     { name: 'Appetizer' },
  //     { name: 'Main' },
  //     { name: 'Side' },
  //     { name: 'Dessert' },
  //     { name: 'Other' },
  //     { name: 'Breakfast' },
  //     { name: 'Lunch' },
  //     { name: 'Dinner' },
  //     { name: 'All' },
  //   ],
  //   default: { name: 'All' },
  // },

  image: { type: imageSchema },
  description: { type: String, required: true, minlength: 1, maxlength: 255 },
  notes: { type: String, minlength: 1, maxlength: 255 },

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

module.exports = RecipeModel
