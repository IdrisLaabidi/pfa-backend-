const mongoose = require('mongoose')

const UserSchema = require('./userModel')

const ProjectSchema = require('./projectModel')

const MessageSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    content : {
        type : String
    },
    sender : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sentTo : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    project : {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    sentAt : {type : Date , default : Date.now}
})

module.exports = mongoose.model('Message',MessageSchema)