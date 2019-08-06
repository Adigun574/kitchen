const config = require('../config/database')
const MongoClient = require('mongodb').MongoClient

module.exports.addProduct = (newProduct, callback)=>{
    MongoClient.connect(config.database, {useNewUrlParser:true},(err,client)=>{
        if (err){
            console.log(err)
        }
        else{
            const db = client.db('kitchen')
            db.collection('products').insertOne(newProduct,callback)
            client.close()
        }
    })
}

module.exports.getProducts = (email, callback)=>{
    MongoClient.connect(config.database, {useNewUrlParser:true},(err,client)=>{
        if(err){
            console.log(err)
        }
        else{
            const db = client.db('kitchen')
            productArray = db.collection('products').find({email:email}).toArray(callback)
        }
    })
}


module.exports.deleteProduct = (productId, callback)=>{
    MongoClient.connect(config.database, {useNewUrlParser:true},(err,client)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log("you can now delete products")
            console.log(productId)
            const db = client.db('kitchen')
            db.collection('products').deleteOne({_id:productId},callback)
            client.close()
        }
    })
}
