
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

app.options("*", cors(
    {
        origin:"*",
        credentials:true,
    }
));



/*app.use(cors(
    {
        origin:['https://youtube-comment-analysis-frontend.vercel.app'],
        credentials:true,
        methods:['PUT','POST','GET','DELETE'],
    }
));
*/
/*
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
*/


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


