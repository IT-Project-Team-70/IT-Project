const User = require('../models/user')
const Comment = require('../models/comment')
const generalHelper = require('../helper/generalHelper')

// Create a new user
async function registerNewUser(user) {
  // const { error } = user.joiValidate()
  // if (error) {
  //   throw new Error(error.details[0].message)
  //   return error
  // }
  let existedUser = await User.findOne({ email: user.email })
  if (existedUser) {
    return err
  }
  try {
    const newUser = new User(user).save()
    return newUser
  } catch (err) {
    throw new Error(err)
  }
}

// get all users
async function getAllUsers() {
  try {
    const result = await User.find()
    return result
  } catch (err) {
    throw new Error(err)
  }
}

// retrieve user from database
async function getUserByID(id) {
  try {
    const user = await User.findById(id)
    if (!user) {
      console.log('user not found')
      return null
    }
    return user
  } catch (err) {
    throw new Error(err)
  }
}

async function getUserByUsername(username) {
  try {
    const user = await User.findOne({ username: username })
    if (!user) {
      console.log('user not found')
      return null
    }
    return user
  } catch (err) {
    console.log(err)
    // throw new Error(err)
  }
}

// update user details
async function updateUser(id, user) {
  // validate user details here
  try {
    const result = await User.findByIdAndUpdate(id, user)
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

// delete user from database
async function deleteUser(id) {
  try {
    const result = await User.findByIdAndDelete(id)
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

async function getOtherUsers(username){
  try{
    const otherUsers = await User.find({username: {$nin: [username]}})
    return otherUsers
  }
  catch(err){
    throw new Error(err)
  }
}

//my info should be 
async function addFriend(user1, user2){
  try{
    user1.friends.push(user2)
    await user1.save()
  } 
  catch(err){
    throw new Error(err)
  }
}
async function unFriend(user1, user2){
  try{
    if(user1.friends && user1.friends.includes(user2._id)){
      user1.friends.remove(user2._id)
      await user1.save()
    }
    else{
      user2.friends.remove(user1._id)
      await user2.save()
    }
  }
  catch(err){
    throw new Error(err)
  }
}
async function addSocketForUserId(userId, socketId){
  try{
    const user = getUserByID(userId)
    user.socketId = socketId
    await user.save()
    return
  }
  catch(err){
    throw new Error(err)
  }
}

async function storeNewNotifications(user, newNoti){
  try{
    const notiArray = [newNoti]
    user.notifications = notiArray.concat(user.notifications)
    await user.save()
    return 
  }
  catch(err){
    throw new Error(err)
  }
}
async function deleteNoti(userId, notiId){
  try{
    const user = await User.findById(userId)
    const newNotiArray = user.notifications.filter((noti) => noti._id != notiId)
    user.notifications = newNotiArray
    await user.save()
    return user
  }
  catch(err){
    throw new Error(err)
  }
}
async function deleteAllNotis(userId){
  try{
    const user = await User.findById(userId)
    user.notifications = []
    await user.save()
    console.log(user)
    return user
  }
  catch(err){
    throw new Error(err)
  }
}
async function readNoti(userId, notiId){
  try{
    const user = await User.findById(userId)
    let newNotis = []
    for(let i = 0; i < user.notifications.length; i++){
      if(user.notifications[i]._id == notiId){
        user.notifications[i].unread = false
        newNotis.push(user.notifications[i])
      }
      else{
        newNotis.push(user.notifications[i])
      }
    }
    user.notifications = newNotis
    await user.save()
   
    return newNotis
  }
  catch(err){
    throw new Error(err)
  }
}
module.exports = {
  registerNewUser,
  getAllUsers,
  getUserByID,
  getUserByUsername,
  updateUser,
  deleteUser,
  getOtherUsers,
  addFriend,
  unFriend,
  addSocketForUserId,
  storeNewNotifications,
  deleteNoti,
  deleteAllNotis,
  readNoti
}
