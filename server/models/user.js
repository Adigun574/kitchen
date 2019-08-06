const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')
const config = require('../config/database')
const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    }
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = function(id, callback){
    User.findById(id, callback)
}

module.exports.getUserByUsername = function(username, callback){
    MongoClient.connect(config.database, {useNewUrlParser:true},(err,client)=>{
        if(err){
            console.log(err)
        }
        else{
            //console.log("you can now authenticate users")
            const db = client.db('kitchen')
            const query = { 'userName': username}
            db.collection('users').findOne(query,callback)
            client.close()
        }
    })
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err,hash)=>{
            if(err) throw err
            newUser.password=hash            
            MongoClient.connect(config.database, {useNewUrlParser:true},(err,client)=>{
                if(err){
                    console.log(err)
                }
                else{
                    //console.log("you can now register users")
                    const db = client.db('kitchen')
                    db.collection('users').insertOne(newUser,callback)
                    client.close()
                }
            })
        })
    })
    
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err
        callback(null, isMatch)
    })
}
