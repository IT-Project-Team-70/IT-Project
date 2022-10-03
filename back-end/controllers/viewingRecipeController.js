const Comment = require("../models/comment")
const generalHelper = require("../helper/generalHelper")
const recipeHelper = require("../helper/recipeHelper")
const commentHelper = require("../helper/commentHelper")

async function viewRecipe(req, res){
  try{
    const recipeId = req.body.recipeId
    if(!generalHelper.isValidObjectId(recipeId)){
      return res.status(404).send('invalid recipe ID')
    }
    const comments = commentHelper.getCommentsFromRecipe(recipeId)
    const recipes = recipeHelper.getRecipeById(recipeId)
    return res.status(200).send({recipes: recipes, comments: comments})
  }
  catch(err){
    throw new Error(err)
  }
}

async function addComments(req, res){
  try{
    if(!generalHelper.isValidObjectId(req.body.recipeId)){
      return res.status(404).send('invalid recipe ID')
    }
    const comment = new Comment({content: req.body.content, userId: req.user._id, recipeId: req.body.recipeId})
    await comment.save()
    return res.status(200).send(comment)
  }
  catch(err){
    res.status(500).send('comment unsuccessfully')
    throw new Error(err)
  }
}

async function likeComments(req, res){
  try{
    if(!generalHelper.isValidObjectId(req.body.commentId)){
      return res.status(404).send('invalid comment ID')
    }
    const comment = await Comment.findById(req.body.commentId)
    console.log(comment)
    comment.likeUsers.push(req.user._id)
    await comment.save()
    return res.status(200).send(comment)
  }
  catch(err){
    res.status(500).send('fail to like the comment')
    throw new Error(err)
  }
}

async function unlikeComments(req, res){
  try{
    if(!generalHelper.isValidObjectId(req.body.commentId)){
      return res.status(404).send('invalid recipe ID')
    }
    const comment = await Comment.findById(req.body.commentId)
    comment.likeUsers.remove(req.user._id)
    return res.status(200).send(comment)
  }
  catch(err){
    res.status(500).send('fail to unlike the comment')
    throw new Error(err)
  }
}

async function editComments(req, res){
  try{
    const commentId = req.body.commentId
    const newContent = req.body.newContent
    if(!generalHelper.isValidObjectId(commentId)){
      return res.status(404).send('invalid recipe ID')
    }
    const comment = await Comment.findByIdAndUpdate(commentId, {content: newContent}, {new: true})
    return res.status(200).send(comment)
  }
  catch(err){
    res.status(500).send('fail to edit the comment')
    throw new Error(err)
  }
}

async function deleteComments(req, res){
  try{
    const commentId = req.body.commentId
    const recipeId = req.body.recipeId
    if(!generalHelper.isValidObjectId(commentId) || !generalHelper.isValidObjectId(recipeId)){
      return res.status(404).send('invalid recipe ID')
    }
    const comment = await Comment.findByIdAndDelete(commentId)
    console.log(comment)
    return res.status(200).send('finish deleting the comment')
  }
  catch(err){
    res.status(500).send('Errors while deleting the comment')
    throw new Error(err)
  }
}
module.exports = {
  addComments,
  deleteComments,
  editComments, 
  unlikeComments, 
  likeComments,
  viewRecipe
}