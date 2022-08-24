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



router.put('/:id',(req,res)=>{

    const id = req.params.id;
    console.log(id);


    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }else{

            console.log(req.body);
            /*const newUserPost  = new userPost({
                userId:req.body.userId,
                tittle:req.body.tittle,
                date:req.body.date,
                time:req.body.time,
                bodyText:req.body.bodyText,
                bodyImage:{
                    data:req.file.filename,
                    contentType:'image/png'
                }

            })*/

            const newUserPost = {
                userId:req.body.userId,
                tittle:req.body.tittle,
                date:req.body.date,
                time:req.body.time,
                bodyText:req.body.bodyText,
                bodyImage:{
                    data:req.file.filename,
                    contentType:'image/png'
                }

            }


            userPost.findByIdAndUpdate(id,newUserPost)
                .then(data=>{
                    if(!data){
                        res.status(404).send({
                            message:`can not update post with ${id} maybe user not found`
                        })
                    }else{
                        res.send(data);

                    }
                })



        }


    })

})



router.delete("/:id",(req,res)=>{

    const id = req.params.id;

    userPost.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send(
                    {message:`cannot Delete with id ${id}. maybe is is wrong`})
            }else{
                res.send({
                    message:"Post was deleted successfully"
                })
            }


        })


})




router.get('/searchUserPost',(req,res)=>{

    const id = req.query.id;

    userPost.find({"userId" : id})
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message:"not found user with id: "+ id
                })
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving  user with id: " + id});
        })



})





module.exports = router;