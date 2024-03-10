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
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// middleware
app.use(express.json()) // instead of using body parser 

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(cookieParser());


// routes
app.use('/api/auth',userRouter)
app.use('/api/task',taskRouter)
app.use('/api/project',projectRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/notification',notifRouter)



app.use(errorHandler);
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then( () => {
  console.log("connected to db");
  // listen for requests
  app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
  })
 }
)
.catch(
  (err) => console.log(err)
);