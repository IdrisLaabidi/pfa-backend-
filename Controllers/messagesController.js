// messages controller

//import modules
const  Message = require('../Models/messageModel');
const User = require("../Models/userModel");


//create a function to get all messages
const getAllMessages = async ()=>{
    try{
        const messages = await Message.find();
        return messages
    }catch(error){
        console.log(error);
    }
}

//create a function to add a Message
const createMessage = async (messageData) => {
    console.log(messageData.sender)
    const senderId = messageData.sender;
    //staamalet nested function w mshet if it works it works
    try {
        const getAllUsers = async (senderId) => {
            try {
                const users = await User.find({sender: { $ne: senderId } });
                return users;
            } catch (error) {
                console.log(error);
            }
        };
        
        allUsers = await getAllUsers(senderId);
        messageData.sentTo = allUsers.map(user=>user.id);
        const message = new Message(messageData);
        const savedMessage = await message.save();
        return savedMessage;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {getAllMessages,createMessage}