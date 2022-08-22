const  express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const connectDB = require('./server/database/connection')
const customer = require('./server/controller/userController')


const app = express();

dotEnv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'));


app.use('/api/customer',customer)

//mongoDb connection
connectDB();



app.get('/',(req,res)=>{
    res.send('Crud application nodemon');
})


app.listen(3000,()=>{console.log(`server is running on http://localhost:${3000}`)});



