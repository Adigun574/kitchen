const MongoClient = require('mongodb').MongoClient
const config = require('../config/database')

module.exports.saveSales=(newSales,callback)=>{
        MongoClient.connect(config.database, {useNewUrlParser: true}, (err,client)=>{
            if(err){
                console.log(err)
            }
            else{
                const db = client.db('kitchen')
                db.collection('sales').insertMany(newSales,callback)
                client.close()    
            }
        })   
}

module.exports.getSalesByEmail=(email,callback)=>{
    MongoClient.connect(config.database, {useNewUrlParser:true}, (err,client)=>{
        if(err){
            console.log(err)
        }
        else{
            const db = client.db('kitchen')
            
            db.collection('sales').find({'email':email}).toArray(callback)
            client.close()
        }
    })
}