const Comment = require('../models/comment')

async function getCommentsFromRecipe(recipeId){
  try{
    const comments = await Comment.findOne({recipeId: recipeId})
    return comments
  }
  catch(err){
    throw new Error(err)
  } 
}
module.exports = {getCommentsFromRecipe}