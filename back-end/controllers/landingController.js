const { readFileSync } = require('fs')
const Recipe = require('../models/recipe')
const path = require('path')

async function getLandingPage(req,res) {
  try {
    let instructions = readFileSync(
      path.join(__dirname + '/../public/resource/landingInstruction.txt'),
      'utf8'
    )
    let demoRecipes = await Recipe.find({ isPublic: true }).limit(10)

    res.status(200).send({ instructions, demoRecipes })
  } catch (err) {
    res.status(500).send('errors while getting landing page')
    throw new Error(err)
  }
}

module.exports = {
  getLandingPage,
}
