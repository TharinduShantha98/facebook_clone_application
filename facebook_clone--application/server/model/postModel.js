const mongoose = require('mongoose');


let schema = new mongoose.Schema({


    userId:{
        type:String,
        required:true,
    },
    tittle:String,
    date:String,
    time:String,
    bodyText:String,
    bodyImage:{
        data: Buffer,
        contentType: String
    }


})


const userPost = mongoose.model('post',schema)
module.exports = userPost