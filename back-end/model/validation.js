const Joi = require('joi')
// const { default: mongoose } = require('mongoose')

/* ***************************************************************************************** */

function validateRecipe(recipe) {
  const schema = {
    title: Joi.string().min(1).max(50).required(),
    source: Joi.object().required(),
    tagList: Joi.array().items(Joi.string()).required(),
    course: Joi.string()
      .valid(
        'Appetizer',
        'Main',
        'Side',
        'Dessert',
        'Other',
        'All',
        'Breakfast',
        'Lunch',
        'Dinner'
      )
      .required(),
    image: Joi.object().required(),
    description: Joi.string().min(1).max(255).required(),
    notes: Joi.string().min(1).max(255).required(),
    prepTime: Joi.object().required(),
    serveSize: Joi.number().required(),
  }

  return Joi.validate(recipe, schema)
}

function validateUser(user) {
  const schema = {
    username: Joi.string().min(1).max(50).required(),
    // password: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(1).max(255).required(),
  }

  return Joi.validate(user, schema)
}

function validateTage(tag) {
  const schema = {
    name: Joi.string().min(1).max(25).required(),
  }

  return Joi.validate(tag, schema)
}

module.exports = {
  validateRecipe,
  validateUser,
  validateTage,
}
