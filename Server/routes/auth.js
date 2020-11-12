const express =  require('express')
const router = express.Router()
const mongoose =require('mongoose')
const User = mongoose.model("User")
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const requireLogin =require("../middleware/requireLogin")
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

// router.get("/protected",requireLogin,(req,res)=>{
//     res.send("hello user")
// })

router.post("/signup",(req,res)=>{
    const {name,email,password,pic}=req.body
    if(!email || !password || !name){
        return res.status(422).json({
            error :"please enter all feilds"
        })
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(402).json({error:"user already exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
            user.save().then(user=>{
                transporter.sendMail({
                    to:user.email,
                    from:"hiddnname0@gmail.com",
                    subject:"SignUp Success",
                    html:`<h1>Welcome to Fleet<h1><h2>Catchup with your nears and dears</h2><p>Hi ${user.name}, you just created a new account on Fleet. We hope you'll get best user experience.`

                })
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/signin",(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({
            error :"please enter email and password"
        })
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(402).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"signed in successfuly"})
                const token= jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports=router