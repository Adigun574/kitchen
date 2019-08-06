const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/database')
const MongoClient = require('mongodb').MongoClient
const passport = require('passport')
const products = require('./routes/products')
const sales = require('./routes/sales')



// MongoClient.connect(config.database, {useNewUrlParser:true},(err,client)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         //console.log("connection established with mongodb")
//         const db = client.db('kitchen')
//         db.collection('users').find({}).toArray((err,result)=>{
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 //console.log("done mongo")
//             }
//         })
//         client.close()
//     }
// })


const port = process.env.PORT || 3000

const users = require('./routes/users')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/users', users)
app.use('/products', products)
app.use('/sales',sales)

app.get("/",(req,res)=>{
    res.send("welcome to heaven motherfuckers")
})

app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})