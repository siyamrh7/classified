const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    phone:String,
    password:{
        type:String,
        required:true
    },
    emailToken:String,

    isVerified:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const Users=mongoose.model('Users',userSchema)

module.exports=Users