const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', (req,res)=>{
    res.send("product api is working")
})


router.post('/addproduct', (req,res)=>{
    let newProduct = {
    name:req.body.name,
    costPrice:req.body.costPrice,
    sellPrice:req.body.sellPrice,
    imgUrl:req.body.imgUrl,
    email:req.body.email,
    category:req.body.category
    }

    Product.addProduct(newProduct,(err,data)=>{
        if(err){
            res.json({success:fail})
        }
        else{
            res.json({success:true,product:newProduct.name})
        }
    })
})

router.get('/getproducts/:email', (req,res)=>{
    let email = req.params.email

    Product.getProducts(email, (err,data)=>{
        if(err){
            res.json({success:false})
        }
        else{
            res.send(data)
        }
    })
})

router.post('/deleteproduct/:productId', (req,res)=>{
    let productId = req.params.productId

    Product.deleteProduct(productId, (err,data)=>{
        if(err){
            res.json({success:false})
        }
        else{
            res.json({success:true,data})
        }
    })
})


module.exports = router