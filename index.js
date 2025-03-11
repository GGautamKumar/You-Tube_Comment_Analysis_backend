
const express =require('express');
const dotenv=require('dotenv');
dotenv.config();
const cors =require('cors');

const connectDB=require('./Connections/db.js');
const bodyParser=require('body-parser');

const router=require('./Routes/user.js')


const app=express();
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
   origin:["https://youtube-comment-analysis-frontend.vercel.app"],
   methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.options("*", cors());



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


