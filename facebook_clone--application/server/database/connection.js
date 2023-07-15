const mongoose = require('mongoose');


const  connectDB = async (uri, callback)=>{
    try{
        const con = await mongoose.connect("mongodb://localhost:27017", {
            useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true
        })

        console.log(`mongoDb Connection :${con.connection.host}`)

    }catch (e) {
        console.log(e)
       process.exit(1);

    }



}


module.exports = connectDB
