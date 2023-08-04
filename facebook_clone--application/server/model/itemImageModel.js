const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    imageId:String,
    bodyImage:{
        data: Buffer,
        contentType: String
    }

});


const ImageItem = mongoose.model('ImageItem',schema)
module.exports = ImageItem
