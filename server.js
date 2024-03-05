require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//routers
const userRouter = require('./Routes/userRoutes')
const projectRouter = require('./Routes/projectRoutes')

// express app
const app = express()

// Enable CORS for all routes
app.use(cors());

// middleware
app.use(express.json()) // instead of using body parser 

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/auth',userRouter)
app.use('/api/project',projectRouter)


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