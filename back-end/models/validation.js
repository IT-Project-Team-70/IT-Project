const Joi = require('joi-oid')

/* ***************************************************************************************** */

let userSchema = Joi.object().keys({
  username: Joi.string().min(1).max(50).required(),
  // password: Joi.string().min(1).max(255).required(),
  email: Joi.string().min(1).max(255).required(),
})

let tagSchema = Joi.object().keys({
  name: Joi.string().min(1).max(25).required(),
  isCourse: Joi.boolean().required(),
  userCreated: Joi.boolean().required(),
})

let ingredientSchema = Joi.object().keys({
  name: Joi.string().min(1).max(255).required(),
  quantity: Joi.string().min(1).max(255).required(),
  unit: Joi.string().min(1).max(255).required(),
})

let recipeSchema = Joi.object().keys({
  userId:Joi.object().required(),
  title: Joi.string().min(1).max(50).required(),
  source: Joi.object().required(),
  tagList: Joi.array().items(Joi.object()).default([]),
  courseList: Joi.array().items(Joi.object()).required(),
  image: Joi.object(),
  description: Joi.string().min(1).max(255).required(),
  notes: Joi.string().min(0).max(255),
  prepTime: Joi.object().required(),
  serveSize: Joi.number().required(),
  ingredients: Joi.array().items(ingredientSchema).required(),
  instructions: Joi.string().min(1).required(),
  steps: Joi.array(),
})

/* ***************************************************************************************** */

module.exports = {
  validateUser: (user) => userSchema.validate(user),
  validateTag: (tag) => tagSchema.validate(tag),
  validateRecipe: (recipe) => recipeSchema.validate(recipe),
}
