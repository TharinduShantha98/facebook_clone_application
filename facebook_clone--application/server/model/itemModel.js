const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    title: String,
    date: String,
    description: String,
    price:Number,
    bodyImage:{
        data: Buffer,
        contentType: String
    }

});


const item = mongoose.model('item',schema)
module.exports = item
