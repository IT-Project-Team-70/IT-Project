const recipeHelper = require('../helper/recipeHelper')

const getOneUserKitchen = async (req, res)=>{
  try{
    const kitchen = await recipeHelper.getPublicRecipes(req.params.userId)
    return res.status(200).send(kitchen)
  }
  catch(err){
    res.status(500).send("fail to get this user's kitchen")
    throw new Error(err)
  }
}
module.exports = {getOneUserKitchen}