
//imports
const express=require('express');
require('dotenv').config();
const apiRoutes =require('@/routes/api');
const fileUpload = require('express-fileupload');
const cors=require('cors');
const helmet=require('helmet');
const logger=require('@/config/logger');
const limiter=require('@/config/ratelimiter');

//utilize
const app=express();
const PORT=process.env.PORT || 8081;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(fileUpload())
app.use(helmet());
app.use(cors());
app.use(limiter)
//routes and uses
app.use('/api',apiRoutes);

app.get('/',(req,res)=>{
return res.json({message:"Hey Congratulation this API is working!!!"})
})




//listner on port
app.listen(PORT, () => {
    logger.log("info",`Server is running on port ${PORT}`);
  });