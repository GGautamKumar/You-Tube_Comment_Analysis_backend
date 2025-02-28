/*
const express =require('express');
const dotenv=require('dotenv');
dotenv.config();
const cors =require('cors');

const connectDB=require('./Connections/db.js');
const bodyParser=require('body-parser');

const router=require('./Routes/user.js')


const app=express();
app.use(bodyParser.json());
app.use(cors({
 origin: process.env.ORIGIN || "*", // Allows all origins if ORIGIN is not set
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Array format is preferred
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }));

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
*/


const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./Connections/db.js');
const bodyParser = require('body-parser');
const router = require('./Routes/user.js');

const app = express();

// Middleware
app.use(bodyParser.json());

const allowedOrigins = [
  "https://youtube-comment-analysis-frontend.vercel.app", 
  "http://localhost:5173" // Allow local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true, // Allow credentials like cookies, auth headers
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Handle Preflight Requests
app.options('*', cors());

// Routes
app.get('/', (req, res) => {
  res.send("Welcome here");
});

app.use('/api', router);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is started at ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

