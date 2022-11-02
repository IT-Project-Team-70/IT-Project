const FriendRequest = require('../models/friendRequest')
const mongoose = require('mongoose')
const addNewRequest = async (sender, receiver) =>{
    try{
        const newRequest = new FriendRequest({sender: sender, receiver: receiver})
        await newRequest.save()
    }
    catch(err){
        throw new Error(err)
    }
}
const checkRequest = async (user1, user2) =>{
    try{
        //if user clicks onto their own page,they shouldn't be able to see the friend status
        if(user1.equals(user2)){
            return 0
        }
        //check if these 2 users are already friends
        if(user1.friends && user1.friends.includes(user2)){
            return 4
        }
        const allRequests = await FriendRequest.find()
        for(let i = 0; i < allRequests.length; i++){
            //I sent the request
            if(allRequests[i].sender.equals(user1) && allRequests[i].receiver.equals(user2)){
                return 1
            }
            //I received the request
            if(allRequests[i].sender.equals(user2) && allRequests[i].receiver.equals(user1)){
                return 2
            }
        }
        return 3
    }
    catch(err){
        throw new Error(err)
    }
}
const deleteRequest = async (sender, receiver) =>{
    try{
        const requiredRequest = await FriendRequest.findOneAndDelete({sender: sender, receiver: receiver})
    }
    catch(err){
        throw new Error(err)
    }
}
module.exports = {deleteRequest, checkRequest, addNewRequest}