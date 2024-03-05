// messages controller

//import modules
const  Message = require('../Models/messageModel')

//create a function to get all messages
const getAllMessages = async (req , res)=>{
    try{    
        const messages = await Message.find();
        res.json(messages);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//create a function to add a Message

const createMessage = async (msg) => {
    try {
        const { content, senderId, sentToIds, projectId } = msg;
        if (!content || !senderId || !sentToIds || !projectId) {
            throw new Error("Please provide all required fields");
        }
        const newMessage = await Message.create({});
        console.log(newMessage);
    } catch (error) {
        //handle error
    }
};

module.exports = {getAllMessages,createMessage}