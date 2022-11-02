const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()
const cors=require('cors')

const userRoutes = require("./routes/user-routes");
const topicRoutes=require("./routes/topic-router");
const questionRoutes=require("./routes/question-routes")
const codePenRoutes=require("./routes/codePen-routes")
const app = express();


//parse the requsets to body
app.use(bodyParser.json());

//cors
app.use(cors())
//adding routes
app.use("/users", userRoutes);
app.use("/test", topicRoutes);
app.use("/question",questionRoutes)
app.use('/codePen',codePenRoutes)

//global error handler
app.use((error,req,res,next)=>{
  if(!error.statusCode){
    error.statusCode=500
  }
    res.status(error.statusCode).json({message:error.message})
})

//not found error handler
app.use((req,res,next)=>{
    res.status(404).json({message:'PAGE NOT FOUND'})
})
//db connection
mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => {
    app.listen(4000);
    console.log("connected to server 4000 and db successfully !!");
  })
  .catch((err) => {
    console.log(err);
  });
