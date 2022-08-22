const mongoose = require('mongoose');


const  connectDB = async ()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URL,{
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