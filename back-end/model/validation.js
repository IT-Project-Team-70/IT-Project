const Joi = require('joi')
// const { default: mongoose } = require('mongoose')

/* ***************************************************************************************** */

function validateRecipe(recipe) {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(50).required(),
    source: Joi.object().required(),
    tagList: Joi.array().items(Joi.string()),
    // course: Joi.object().keys({
    //   name: Joi.string().valid(
    //     'Appetizer',
    //     'Main',
    //     'Side',
    //     'Dessert',
    //     'Other',
    //     'Breakfast',
    //     'Lunch',
    //     'Dinner',
    //     'All'
    //   ),
    // })
    // .required(),
    image: Joi.object(),
    description: Joi.string().min(1).max(255).required(),
    notes: Joi.string().min(1).max(255),
    prepTime: Joi.object().required(),
    serveSize: Joi.number().required(),
    ingredients: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().min(1).max(255).required(),
          quantity: Joi.string().min(1).max(255).required(),
          unit: Joi.string().min(1).max(255).required(),
        })
      )
      .required(),
    instructions: Joi.string().min(1).max(255).required(),
  })

  return schema.validate(recipe)
}

function validateUser(user) {
  const schema = Joi.object().keys({
    username: Joi.string().min(1).max(50).required(),
    // password: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(1).max(255).required(),
  })

  return schema.validate(user)
}

function validateTage(tag) {
  const schema = Joi.object().keys({
    name: Joi.string().min(1).max(25).required(),
  })

  return schema.validate(tag)
}

module.exports = {
  validateRecipe,
  validateUser,
  validateTage,
}
