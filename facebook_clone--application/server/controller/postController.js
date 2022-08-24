const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
let jsonParser = bodyParser.json();
let userPost = require("../model/postModel");



//storage

const Storage = multer.diskStorage({
    destination:'D:/express+mongoDb/facebook_clone--application/assets/uploads',
    filename:(req,file, cb)=>{
        console.log(file.originalname);
        cb(null, file.originalname);
    }
})


const upload = multer({
    storage:Storage
}).single('bodyImage')


router.get('/',(req,res)=>{

    userPost.find()
        .then(post=>{
            res.send(post);
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message|| "Error Occurred while retrieving user information"
            })
        })



})



router.post('/',(req,res)=>{
    console.log(req.body)

    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }else{
            const newUserPost  = new userPost({
                userId:req.body.userId,
                tittle:req.body.tittle,
                date:req.body.date,
                time:req.body.time,
                bodyText:req.body.bodyText,
                bodyImage:{
                    data:req.file.filename,
                    contentType:'image/png'
                }

            })

            newUserPost
                .save()
                .then(()=>{
                    res.send("post upload successfully");
                }).catch((err)=>{
                    res.send("not successFully");

            })

        }


    })




})


module.exports = router;