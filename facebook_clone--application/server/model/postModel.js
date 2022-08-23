const mongoose = require('mongoose');


let schema = new mongoose.Schema({


    userId:{
        type:String,
        required:true,
    },
    tittle:String,
    Date:String,
    time:String,
    bodyText:String,
    bodyImage:{
        data: Buffer,
        contentType: String
    }


})


const post = mongoose.model('post',schema)
module.exports = post