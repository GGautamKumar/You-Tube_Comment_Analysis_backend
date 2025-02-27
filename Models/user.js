const mongoose =require('mongoose');

const userSchema=new mongoose.Schema({
    videoId:{
        type:String,
        required:true,
        unique:true
    },
    Agree:{
        type:Number,
        default:0
    },
    Disagree:{
        type:Number,
        default:0
    },
    Neutral:{
        type:Number,
        default:0
    },
    keywords:{
        type:Array,
        default:[]
    },
    Months:{
        type:Array,
        default:[]
    }
     
});

const user=mongoose.model('user',userSchema);

module.exports=user;