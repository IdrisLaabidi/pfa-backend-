require('dotenv').config(); // import the config file 

const express = require('express');//imports the express framework
const http = require('http');//import http module from nodejs
const socketIo = require('socket.io');//import socket.io which enables RTC(RealTimeCommunication) between clients and a server
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//importing routers
const userRouter = require('./Routes/userRoutes')
const taskRouter= require('./Routes/taskRoutes')
const projectRouter = require('./Routes/projectRoutes')
const leaveRouter = require('./Routes/leaveRoutes')
const notifRouter = require('./Routes/notificationRoutes')
const messagesRouter = require('./Routes/messagesRoute')
//import middleware
const { errorHandler} = require('./Middleware/errorMiddleware')
//import addMessage from controller it's all in the back better than using the api in the front
const {createMessage} = require('./Controllers/messagesController')

const app = express();//create express app

const server = http.createServer(app);//create http server
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity, but you should restrict this in production
    /*              cors(CrossOrigineResourceSharing) (*)===>let anyone within the netwrok to connect to the server   */
  }
});

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
  credentials: true
}));

// middleware
app.use(express.json()) // instead of using body parser 

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use(cookieParser())
// routes
app.use('/api/auth',userRouter)
app.use('/api/messages',messagesRouter);
app.use('/api/task',taskRouter)
app.use('/api/projects',projectRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/notification',notifRouter);



mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  const db = mongoose.connection;
  const collection = db.collection('messages');
  const changeStream = collection.watch();

  changeStream.on('change', function(change) {
    if (change.operationType === 'insert') {
      // New document inserted, send the inserted document to WebSocket clients
      const newMessage = change.fullDocument;
      const messageString = JSON.stringify(newMessage);
      io.emit('chat message',messageString);
    }
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
io.on('connection', async (socket) => { /*on method is able to listen to an event on(eventnamestring,event function) when client triggers that
                                  event the function is being calledback NB:eventnamestring is abitrarr(li howa) yaany mayhemesh lesm
                                  it has to match the name in the client side            */
  console.log('a user connected:', socket.id);
  socket.on('disconnect', () => {//same thing
    io.emit('user-left', socket.id);
    console.log('a user disconnected', socket.id);
  });
  socket.on('meet chat message',(msg)=>{
    io.emit('meet chat message',msg);
  })
  socket.on('join-room', (userId, roomId) => {
    // Join the room
    socket.join(roomId);
  
    // Broadcast to all other clients in the room except the sender
    socket.to(roomId).emit('user-joined', userId);
    
    console.log('user:', userId, 'joined room', roomId);
  });
  socket.on('chat message', async (msg) => {
    try {
        await createMessage(msg);
    } catch (error) {
        console.error('Error sending message:', error);
        // Handle the error {ya men 7yé}
    }
});
});
const PORT = process.env.PORT || 4000;//sets port for the server to listen events on
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));//once server is listening or is running we log a message