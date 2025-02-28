
const express =require('express');
const dotenv=require('dotenv');
dotenv.config();
const cors =require('cors');

const connectDB=require('./Connections/db.js');
const bodyParser=require('body-parser');

const router=require('./Routes/user.js')


const app=express();
app.use(bodyParser.json());

app.use(cors(
    {
        origin:'http://localhost:5173',
        credentials:true,
        methods:['PUT','POST','GET','DELETE'],
        maxAge:3600
    }
));


app.get('/',(req,res)=>{
    res.send("Welcome here");
})

app.use('/api',router);


const PORT=process.env.PORT;

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is started at ${PORT}`);
    
    })
})
.catch((error)=>{
    console.log(error);
})


