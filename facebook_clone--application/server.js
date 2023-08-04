const  express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');




const connectDB = require('./server/database/connection')
const customer = require('./server/controller/userController')
const userPost = require('./server/controller/postController')
const userLogin = require('./server/controller/loginController')
const item = require('./server/controller/itemController')
const placeOrder = require('./server/controller/placeOrderController')






const app = express();
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

//app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
// app.use(upload.array());
// app.use(express.static('public'));


dotEnv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'));


//Api
app.use('/api/customer',customer)
app.use('/api/post',userPost)
app.use('/api/user',userLogin)
app.use('/api/item',item)
app.use('/api/placeOrder',placeOrder)

//mongoDb connection
connectDB();





app.get('/',(req,res)=>{
    res.send('Crud application nodemon');
})


app.listen(3000,()=>{console.log(`server is running on http://localhost:${3000}`)});



