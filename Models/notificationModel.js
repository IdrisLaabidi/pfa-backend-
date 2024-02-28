const mongoose = require('mongoose')

const UserSchema = require('./userModel');

//define the notification schema 
const NotificationSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    content : {
        type : String
    },
    sentTo : {type : UserSchema , required : true},
    sendAt : {type : Date , default : Date.now}
})

module.exports = mongoose.model('Notification',NotificationSchema)