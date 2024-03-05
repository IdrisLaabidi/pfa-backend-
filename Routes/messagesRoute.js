const express = require('express');
const router = express.Router();

//import controller functions
const {getAllMessages,createMessage} = require('../Controllers/messagesController');

router.get('/',getAllMessages);
router.get('/addMessage',createMessage);

module.exports = router;