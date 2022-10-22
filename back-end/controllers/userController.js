const userHelper = require('../helper/userHelper')

async function getOtherUsers(req, res){
  try{
    const allUsers = await userHelper.getOtherUsers()
    return res.status(200).send(allUsers)
  }
  catch(err){
    res.status(500).send('Errors while getting all users')
    throw new Error(err)
  }
}

async function getAllNotifications(req, res){
  try{
    const user = await userHelper.getUserByID(req.user._id)
    const notifications = user.notifications
    return res.status(200).send(notifications)
  }
  catch(err){
    return res.status(500).send('Errors while getting all notifications')
    throw new Error(err)
  }
}
async function deleteNotification(req, res){
  try{
    const user = await userHelper.deleteNoti(req.user._id, req.params._id)
    return res.status(200).send(user)
  }
  catch(err){
    res.status(500).send('Errors while deleting a notification')
    throw new Error(err)
  }
}
async function deleteAllNotifications(req, res){
  try{
    const user = await userHelper.deleteAllNotis(req.user._id)
    return res.status(200).send(user)
  }
  catch(err){
    res.status(500).send('Errors while deleting all notifications')
    throw new Error(err)
  }
}
async function readNotification(req, res){
  try{
    const notis = await userHelper.readNoti(req.user._id, req.body.notiId)
    const result = {
      email: req.user.email,
      username: req.user.username,
      id: req.user._id,
      notifications: notis
    }
    return res.status(200).send(result)
  }
  catch(err){
    res.status(500).send('Errors while reading a notification')
    throw new Error(err)
  }
}
module.exports = {getAllNotifications, deleteNotification, deleteAllNotifications, readNotification}