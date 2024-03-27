// messages controller

//import modules
const  Message = require('../Models/messageModel');
const User = require("../Models/userModel");


//create a function to get all messages
const getAllMessages = async (req,res)=>{
    const projectId = req.params.id;
    try{
        if (projectId === 'null') {
            // Handle the case where projectId is null
            return res.status(400).json({ error: 'Invalid projectId provided' });
        }
        if(projectId){
            
            const messages = await Message.find({project : projectId});
            res.status(200).json(messages);
        } 
    }catch(error){
        res.status(500).json({message : 'Failed to retrieve messages',error:error})
       
    }
}

//create a function to add a Message
const createMessage = async (messageData) => {
    const senderId = messageData.sender;
    //staamalet nested function w mshet if it works it works
    try {
        
        const message = new Message(messageData);
        const savedMessage = await message.save();
        return savedMessage;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {getAllMessages,createMessage}