const FriendRequest = require('../models/friendRequest')
const User = require('../models/user')
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
const checkRequest = async (id1, id2) =>{
    try{
        //if user clicks onto their own page,they shouldn't be able to see the friend status
        if(id1.equals(id2)){
            return 0
        }
        const user1 = await User.findById(id1)
        const user2 = await User.findById(id2)
        //check if these 2 users are already friends
        if(user1.friends && user1.friends.includes(id2)){
            console.log(4)
            return 4
        }
        else if(user2.friends && user2.friends.includes(id1)){
            console.log(4)
            return 4
        }
        const allRequests = await FriendRequest.find()
        for(let i = 0; i < allRequests.length; i++){
            //I sent the request
            if(allRequests[i].sender.equals(id1) && allRequests[i].receiver.equals(id2)){
                return 1
            }
            //I received the request
            if(allRequests[i].sender.equals(id2) && allRequests[i].receiver.equals(id1)){
                console.log(allRequests)
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