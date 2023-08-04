const mongoose  = require('mongoose');


let schema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    items: [{
        itemId: {
            type: String,
            required: true,
        },
        qty:Number,
        unitPrice:Number,

    }],
    totalPrice:Number,

})


const placeOrder = mongoose.model('placeOrder',schema)
module.exports = placeOrder






