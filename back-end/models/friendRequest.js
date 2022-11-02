const mongoose = require('mongoose')
const friendRequestSchema = mongoose.Schema(
    {sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}}
)
const requestModel = new mongoose.model('FriendRequest', friendRequestSchema)
module.exports = requestModel