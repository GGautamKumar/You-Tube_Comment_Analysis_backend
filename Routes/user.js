const express=require('express');

const {Add}=require('../Controllers/user.js')

const router=express.Router();


router.post('/add',Add);


module.exports=router;