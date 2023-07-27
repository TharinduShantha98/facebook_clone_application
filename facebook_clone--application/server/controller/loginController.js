const express = require('express');
const router = express.Router();
let userDb = require('../model/userModel');
let jwtToken = require('../security/jwtConfig')
const bcrypt = require('bcrypt')

router.post('/login',async (req,res)=>{
    console.log(req.body);


    try{
        let {userName, password} = req.body
        let user = await userDb.findOne({userName})
        if(!user){
            console.log("user not found ")
            return res.status(404).json({message: 'user not found'})
        }
        console.log(user.password)
        console.log(password)
        let passwordMatch  = await bcrypt.compare(password,user.password);
        console.log(passwordMatch)
        if(!passwordMatch){
            return  res.status(404).json({message:'password  not matched'})
        }
        const token = jwtToken.generateToken({userName: user.firstName, role: user.role})
        return res.status(200).json({message: 'valid', token: token})

    }catch (e) {
        return (e)
    }


})

module.exports = router;
