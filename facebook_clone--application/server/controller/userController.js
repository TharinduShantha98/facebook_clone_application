const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false })


let userDb = require('../model/userModel');
const jwtAuthMiddleware =  require('../security/jwtAuthMiddle')




const requireRole = (requiredRole) => (req, res, next) => {
    console.log(req.user);
    console.log(req.user.userName);
    console.log(req.user.role);

    if (req.user && req.user.role === requiredRole) {
        return next();
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
};


router.get('/',jwtAuthMiddleware,requireRole('admin'),(req,res)=>{
    console.log("hello world");

    userDb.find()
        .then(user=>{
            res.send(user);
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error Occurred while retrieving user information"
            })
        })



})


router.post('/',jsonParser,async (req,res)=>{

    console.log(req.body);


    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return

    }

    const saltRounds = 10

    const user = new userDb({
        firstName: req.body.firstName,
        surname:req.body.surname,
        gender:req.body.gender,
        dateOfBirth:req.body.dateOfBirth,
        phoneNumber:req.body.phoneNumber,
        password: await bcrypt.hash(req.body.password,saltRounds),
        email: req.body.email,
        userName:req.body.userName,
        isFirstTimeLogin:true,
        createdDate:new Date(),
        updatedDated:null,
        loginAttemptCount:0

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


router.put('/:id',jsonParser,(req,res)=>{
    console.log("hello put")

    if(!req.body){
        res.status(400).send({message:"content can not be empty"})
        return
    }

    const id = req.params.id;
    const content =  req.body;

   userDb.findByIdAndUpdate(id, content)
       .then(data=>{
           if(!data){
              res.status(404).send({message:`cannot update user with${id}. maybe user not found`})
           }else{
               res.send(data)
           }

       })

})


router.delete("/:id",(req,res)=>{

    const id = req.params.id;

    userDb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`cannot Delete with id ${id}. maybe is is wrong`})
            }else {
                res.send({
                    message:"User was deleted successfully"
                })
            }

        }
    )




})



router.get('/searchUser',(req,res)=>{

    const id = req.query.id;

    userDb.findById(id)
        .then(data=>{

            if(!data){
                res.status(404).send({message:"not found user with id: " + id});
            }else{
                res.send(data);
            }


        })
        .catch(err =>{
            res.status(500).send({message:"Error retrieving  user with id: " + id});
        })




})


router.post('/login',(req,res)=>{

    let userName = req.body.username
    let email = req.body.email

    console.log(email);


    userDb.find({"firstName" : userName, "email": email})
        .then(user =>{
            if(user){
                //res.send(user)

                let token = jsonWebToken.sign(
                    {userName:user.username},
                    'verySecretValue',{expiresIn: '1h'})


                res.json({
                    message: "login successfully",
                    Token: token
                })

            }else{
                res.send({
                    message:"no user found"
                })
            }
        })


})




module.exports = router;












