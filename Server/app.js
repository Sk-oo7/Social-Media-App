const express = require('express')

const app=express()
const port =5000

const customMiddleware =(req,res,next)=>{
    console.log("middleware executed")
    next()
}


app.get("/",(req,res)=>{
    console.log("main page")
    res.send("HelloWorld")
})

app.get("/about",customMiddleware,(req,res)=>{
    console.log("about page")
    res.send("AboutPage")
})

app.listen(port,()=>{
    console.log("server is running on ",port)
})