async function getLandingPage(req, res) {
  let instruction = getWebsiteInstructions(req, res)
  let demoRecipes = getDemoRecipes(req, res)

  res.status(200).send({ instruction, demoRecipes })
}

async function getWebsiteInstructions(req, res) {}

async function getDemoRecipes(req, res) {}

module.exports = {
  getLandingPage,
}
