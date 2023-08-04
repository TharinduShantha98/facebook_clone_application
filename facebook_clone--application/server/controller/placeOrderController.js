const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const multer = require('multer');

let placeOrderDb = require("../model/placeOrderModel");
const jwtAuthMiddleware =  require('../security/jwtAuthMiddle')


router.post('/',jwtAuthMiddleware,jsonParser,async (req,res)=>{

    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return

    }
    console.log( req.body.items)

    let items = [];
    items  = req.body.items

    const itemArrayObject  = [];

    for(let value of items){
        itemArrayObject.push({"itemId":value.itemId,"qty":value.qty,"unitPrice":value.unitPrice})
        console.log(value.qty)
        console.log(value.itemId)
        console.log(value.unitPrice)
    }

    const placeOrder = new placeOrderDb({
        userId:req.body.userId,
        items: itemArrayObject,
        totalPrice: req.body.totalPrice

    })

    placeOrder
        .save(placeOrder)
        .then(data=>{

            res.status(200).json({ message: 'save successfully' , data:data,status:10});
        })
        .catch(err=>{
            res.status(500).json({ message: 'save unSuccessfully',data:null,status:10 });
        })

})



module.exports = router;



