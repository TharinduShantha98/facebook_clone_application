const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false })


let userDb = require('../model/userModel');




router.get('/',(req,res)=>{
    console.log("hello world");
    res.send('customer get');

})


router.post('/',jsonParser,(req,res)=>{

    console.log(req.body);


    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return

    }

    const user = new userDb({
        firstName: req.body.firstName,
        surname:req.body.surname,
        gender:req.body.gender,
        dateOfBirth:req.body.dateOfBirth,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email

    })

    user
        .save(user)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message|| "some error occurred while creating a create operation"
            })
        })







})



module.exports = router;












