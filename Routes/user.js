const express=require('express');

const {Add}=require('../Controllers/user.js')

const router=express.Router();


router.post('/add',Add);
router.get('/add',(req,res)=>{
    res.send("welcome to add url");
})


module.exports=router;
