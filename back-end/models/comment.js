const mongoose = require('mongoose')
const validation = require('./validation')

const commentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  recipeId: {type: mongoose.Schema.Types.ObjectId, ref:'Recipe', required: true},
  likeUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})
commentSchema.methods.joiValidate = function(comment){
  return validation.validateComment(comment)
}

const commentModel = new mongoose.model('Comment', commentSchema)
module.exports = commentModel