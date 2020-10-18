const express = require('express')
const mongoose =require('mongoose')

const app=express()
const port =5000
const {MONGOURI}=require('./keys')

require('./models/user')
app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to MONGO-DB")
}) 
mongoose.connection.on('error',(err)=>{
    console.log(err)
})


app.listen(port,()=>{
    console.log("server is running on ",port)
})