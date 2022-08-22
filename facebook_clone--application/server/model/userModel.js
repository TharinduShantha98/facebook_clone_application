const mongoose  = require('mongoose');

let schema = new mongoose.Schema({

    firstName:{
        type:String,
        required: true,
    },
    surname:{
        type: String,
        required: true,
    },
    gender: String,
    dateOfBirth:String,
    phoneNumber:String,
    email:{
        type:String,
        required:true,
        unique:true,

    }




})


const userDb = mongoose.model('userDb',schema);
module.exports = userDb