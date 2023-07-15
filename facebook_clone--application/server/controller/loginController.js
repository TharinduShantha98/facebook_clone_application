const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken');

let userDb = require('../model/userModel');



const secretKey = 'I_have_a_BENZ';



function generateToken(payload){
    return jwt.sign(payload, secretKey,{expiresIn: '1h'})
}

function verifyToken(token){
    return jwt.verify(token, secretKey);
}




router.post('/login',async (req,res)=>{
    console.log(req.body);


    try{
        let {firstName, email} = req.body
        let user = await userDb.findOne({firstName})
        if(!user){
            console.log("user not found ")
            return res.status(404).json({message: 'user not found'})
        }
        console.log(user.email)
        console.log(email)
        if(user.email !== email){
            return  res.status(404).json({message:'email not found'})
        }
        const token = generateToken({userName: user.firstName })
        return res.status(200).json({message: 'valid', token: token})

    }catch (e) {
        return nextTick(e)
    }





})

module.exports = router;
