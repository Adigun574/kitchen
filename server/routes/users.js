const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('../config/database')
const bcrypt = require('bcryptjs')


router.get('/',(req,res,next)=>{
    res.send("come on register jare")
})

router.post('/register',(req,res,next)=>{
    let newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password,
        companyName:req.body.companyName
    })

    User.addUser(newUser,(err,user)=>{
        if(err){
            res.json({success:false, msg:"user not created"})
        }
        else{
            res.json({success:true, msg:"user registered"})
        }
    })
})


router.post('/login',(req,res,next)=>{
    const userName = req.body.userName
    const  password = req.body.password  

     User.getUserByUsername(userName, (err, user)=>{
        if(err) throw err
        else if(!user){
            return res.json({success: false, msg:"user not found"})
        }
        else if(user){
            bcrypt.compare(password, user.password, (err,data)=>{
                if(err){
                    console.log("failed",err)
                }
                else{
                    console.log(data,user)
                    res.json({success:data,email:user.email,name:user.userName})
                }
            })
         }
         else{
            return res.json({success: false, msg:"user not confirmed"})
            console.log("incorrect password",user)
         }
    })
})

module.exports = router
