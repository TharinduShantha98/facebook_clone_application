const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const multer = require('multer');

let itemDb = require("../model/itemModel");
const jwtAuthMiddleware =  require('../security/jwtAuthMiddle')


const upload = multer();
router.post('/',jwtAuthMiddleware,upload.single('image','text'),jsonParser,async (req,res)=>{

    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return

    }
    const file = req.file;
    let text1 = req.body.text;
    const itemJsonObject =  JSON.parse(text1)
    const item = new itemDb({
        title: itemJsonObject.title,
        date:new Date(),
        description:itemJsonObject.description,
        price:itemJsonObject.price,
        bodyImage:{
            data:file.buffer,
            contentType:file.mimeType
        }

    })

    item
        .save(item)
        .then(data=>{
            res.status(200).json({ message: 'save successfully' , data:data,status:10});
        })
        .catch(err=>{
            res.status(500).json({ message: 'save unSuccessfully',data:null,status:5 });
        })

})



router.get('/',jwtAuthMiddleware,(req,res)=>{
    console.log("hello world");

    itemDb.find()
        .then(item=>{
            res.status(200).json({ message: 'save successfully' , data:item,status:10});
        })
        .catch(err=>{
            res.status(500).json({ message: 'get  unSuccessfully',data:null,status:5});
        })



})


router.get('/searchItem',jwtAuthMiddleware,(req,res)=>{

    const id = req.query.id;
    itemDb.findById(id)
        .then(data=>{

            if(!data){
                res.status(404).send({message:"not found user with id: " + id,data:null,status:5});
            }else{
                res.status(200).json({ message: 'search successfully',data:data,status:10});
            }

        })
        .catch(err =>{
            res.status(500).send({message:"Error retrieving  user with id: " + id});
        })




})



router.delete("/:id",(req,res)=>{

    const id = req.params.id;

    itemDb.findByIdAndDelete(id)
        .then(data=>{
                if(!data){
                    res.status(500).send({message:`cannot Delete with id ${id}. maybe is is wrong`,data:null,status:10})
                }else {
                    res.status(200).send({message:"delete succesfully " ,data:data,status:10});
                }

            }
        )




})








module.exports = router;
