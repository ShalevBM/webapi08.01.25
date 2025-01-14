const express=require('express');
const app=express();
const productRouter=require('./api/v1/routes/product');
const morgan=require('morgan');
const mongoose=require('mongoose');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

const secure=require('./api/v1/middlewares/secure');
const mongoConnstr=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ecom.r9vhn.mongodb.net/WebApi2025`;
mongoose.connect(mongoConnstr).then(()=>{
    console.log('Connected To Mongo');
});

app.use('/product',productRouter);
app.all('*',(req,res)=>{
    return res.status(404).json({Msg:`Not Found 404`}); 
});

module.exports=app;