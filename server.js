require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
//routers
const userRouter = require('./Routes/userRoutes')
const taskRouter= require('./Routes/taskRoutes')
const projectRouter = require('./Routes/projectRoutes')
const leaveRouter = require('./Routes/leaveRoutes')
const notifRouter = require('./Routes/notificationRoutes')
//import middleware
const { errorHandler} = require('./Middleware/errorMiddleware')


// express app
const app = express()

// Enable CORS for all routes
app.use(cors());
app.use(express.json());// instead of using body parser 

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(cookieParser());


// routes
app.use('/api/auth',userRouter)
app.use('/api/project',projectRouter)
app.get('/api/addMessage',messagesRouter);
app.get('/api/allMessage',messagesRouter);
app.use('/api/task',taskRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/notification',notifRouter)



app.use(errorHandler);
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then( () => {
  console.log("connected to db");
  // listen for requests
  app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT||4000)
  })
 }
)
.catch(
  (err) => console.log(err)
);

io.on('connection', async (socket) => { /*on method is able to listen to an event on(eventnamestring,event function) when client triggers that
                                  event the function is being calledback NB:eventnamestring is abitrarr(li howa) yaany mayhemesh lesm
                                  it has to match the name in the client side            */
  console.log('a user connected:', socket.id);
  const allMessages = await getAllMessages();
  io.emit('allMessage',allMessages);
  socket.on('disconnect', () => {//same thing
    io.emit('user-left', socket.id);
    console.log('a user disconnected', socket.id);
  });
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
        io.emit('chat message', msg); // Emit the saved message
    } catch (error) {
        console.error('Error sending message:', error);
        // Handle the error {ya men 7yé}
    }
});
});

const PORT = process.env.PORT || 4000;//sets port for the server to listen events on
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));//once server is listening or is running we log a message