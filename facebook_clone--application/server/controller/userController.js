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


router.post('/',(req,res)=>{

    console.log("hiiiiiiii")
    res.send("hiiiii");



})



module.exports = router;












