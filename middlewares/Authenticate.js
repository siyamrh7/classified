const jwt=require('jsonwebtoken')
const Users=require('../models/User')
const Authenticate=async(req,res,next)=>{
try {
    const token=req.headers.authorization

if(!token){return res.json({status:false,msg:"Authentication Error"})}
const {user}=await jwt.verify(token,process.env.JWT_SECRET)
const User=await Users.findById(user._id)
if(!User){return res.json({status:false,msg:"User doesn't exist"})}
req.user=User
req.id=User.id
next()
} catch (error) {
    return res.json({status:false,msg:error.message})
}
}


module.exports=Authenticate