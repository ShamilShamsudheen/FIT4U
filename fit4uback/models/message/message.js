const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const Messege = mongoose.Schema({

    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    senderType: { type: String, enum: ['User', 'Trainer'] },
    receiverType: { type: String, enum: ['User', 'Trainer'] },
    sender: { type: String,refPath: 'senderType' },
    receiver: { type: String,refPath: 'receiverType' },
    message: { type: String },
    timestamp: { type: Date, default: Date.now },

})

module.exports = mongoose.model("Messege", Messege)