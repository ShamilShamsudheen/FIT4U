const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const Chat = mongoose.Schema({

    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
    ],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    lastMessege:{type:String},
    timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Chat", Chat)