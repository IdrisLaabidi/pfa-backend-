const mongoose = require('mongoose')

const UserSchema = require('./userModel')

const LeaveSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    startDate : {type : Date , required : true},
    endDate : {type : Date , required : true},
    motive : {type : String},
    type : { type : String , enum : ['sick leave','annual','normal'],default : 'normal'},
    concernedUser : {type : UserSchema},
    status : {type : String , enum : ['pending' , 'confirmed' ,'declined'] ,default : 'pending'}
})

module.exports = mongoose.model('Leave',LeaveSchema)