const { default: mongoose } = require('mongoose')
const validation = require('./validation')

/* ***************************************************************************************** */
const imageSchema = new mongoose.Schema({
  data: { type: String, required: true },
  type: { type: String },
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
  step: { type: Number, required: true, min: 1 },
  description: { type: String, required: true, minlength: 1 },
  ingredients: [ingredientSchema],
  image: { type: imageSchema },
})

const rateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rate: { type: Number, required: true, min: 0, max: 5 },
})

const recipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, minlength: 1 },
  source: { type: sourceSchema, required: true },
  ratingList: { type: [rateSchema], default: [] },
  averageRating: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true },

  tagList: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    default: [],
  },
  courseList: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    required: true,
  },
  categoryNameList: {
    type: [String],
    default: [],
  },
  courseNameList: {
    type: [String],
    default: [],
    required: true,
  },

  image: { type: imageSchema },
  description: { type: String, required: true, minlength: 1 },
  notes: { type: String, minlength: 0, default: '' },
  prepTime: { type: prepTimeSchema, required: true },
  serveSize: { type: Number, required: true },
  ingredients: { type: [ingredientSchema], required: true },
  instructions: { type: String, required: true, minlength: 1 },
  steps: { type: [stepsSchema], default: [] },
})

recipeSchema.methods.joiValidate = function (recipe) {
  return validation.validateRecipe(recipe)
}

const RecipeModel = mongoose.model('Recipe', recipeSchema)

/* ***************************************************************************************** */

module.exports = RecipeModel
