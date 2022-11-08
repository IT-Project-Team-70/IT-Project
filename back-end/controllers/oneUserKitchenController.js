const recipeHelper = require('../helper/recipeHelper')
const requestHelper = require('../helper/requestHelper')
const userHelper = require('../helper/userHelper')
const mongoose = require('mongoose')
const getOneUserKitchen = async (req, res)=>{
  try{
    const userId = mongoose.Types.ObjectId(req.params.userId)
    if(userId){
      const kitchen = await recipeHelper.getUserRecipes(mongoose.Types.ObjectId(userId))
      const friendStatus = await requestHelper.checkRequest(req.user._id, mongoose.Types.ObjectId(userId))
      const user = await userHelper.getUserByID(userId)
      return res.status(200).send({kitchen: kitchen, friendStatus: friendStatus, profile: user})
    }
  }
  catch(err){
    res.status(500).send("fail to get this user's kitchen")
    throw new Error(err)
  }
}
const rejectRequest = async (req, res)=>{
  try{
    await requesHelper.deleteRequest(mongoose.Types.ObjectId(req.params.userId), req.user._id)
    return res.status(200)
  }
  catch(err){
    res.status(500).send('fail to reject request')
    throw new Error(err)
  }
}
module.exports = {getOneUserKitchen, rejectRequest}