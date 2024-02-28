const mongoose = require('mongoose')

const UserSchema = require('./userModel')

const ProjectSchema = require('./projectModel')

const MessageSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    content : {
        type : String
    },
    sender : {type : UserSchema},
    sentTo : [{type : UserSchema}],
    project : {type : ProjectSchema},
    sentAt : {type : Date , default : Date.now}
})

module.exports = mongoose.model('Message',MessageSchema)