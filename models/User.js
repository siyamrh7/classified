const { type } = require('express/lib/response')
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
    },
    posts:[
        {
            type:mongoose.Types.ObjectId
        }
        
]

},{timestamps:true})

const Users=mongoose.model('Users',userSchema)

module.exports=Users