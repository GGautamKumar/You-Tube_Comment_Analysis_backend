const express=require('express');
const cors=require('cors');

const {Add}=require('../Controllers/user.js')

const router=express.Router();


router.post('/add',cors(),Add);
router.get('/add',cors(),(req,res)=>{
    res.send("welcome to add url");
})


module.exports=router;
