const express = require('express')
const mongoose =require('mongoose')

const app=express()
const port =5000
const {MONGOURI}=require('./keys')


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

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))



app.listen(port,()=>{
    console.log("server is running on ",port)
})