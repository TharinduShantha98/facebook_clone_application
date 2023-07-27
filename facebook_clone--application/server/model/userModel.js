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

    },
    password:String,
    userName:String,
    isFirstTimeLogin:Boolean,
    createdDate: Date,
    updatedDated:Date,
    loginAttemptCount:Number,
    role:{ type: String, enum: ['user', 'admin'], default: 'user' }


})


const userDb = mongoose.model('userDb',schema);
module.exports = userDb
