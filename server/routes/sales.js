const express = require('express')
const router = express.Router()
const Sales = require('../models/sales')


router.post('/saleshistory',(req,res)=>{

    let salesHistory = []
    
    req.body.forEach((item,index)=>{
        let d = new Date()
        sec = d.getDate()
        min = d.getMinutes()
        hour = d.getHours()
        mon = d.getMonth() + 1
        year = d.getFullYear()
        day = d.getDate()
        saleTime = `${year}/${mon}/${day} ${hour}:${min}:${sec}`
        let newSales={
                name:item.name,
                category:item.category,
                costPrice:item.costPrice,
                email:item.email,
                quantity:item.quantity,
                sellPrice:item.sellPrice,
                time:saleTime
            } 
        salesHistory.push(newSales)
    })
        Sales.saveSales(salesHistory,(err,data)=>{
            if(err){
                res.json({success:false})
            }
            else{
                res.json({success:true})
            }
        })

    
})

router.get('/saleshistory/:email',(req,res)=>{
    let email = req.params.email
    Sales.getSalesByEmail(email,(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(data)
        }
    })
})

module.exports = router

