
const Phones =require('../models/Product/Phone')

const Users=require('../models/User')

const PhonePost=async(req,res)=>{
    try {
        
        
        const phone=new Phones({
            ...req.body,user:req.id,images:req.files
        })
const Phone=await phone.save()
await Users.findByIdAndUpdate(req.id,{
    $push:{posts:Phone._id}
})
res.json({status:true,msg:"Your ads is posted successfully"})
    } catch (error) {
        return res.json({status:false, msg:error.message})
    }
}
const PhoneGet=async(req,res)=>{
    try {
        const phones=await Phones.find({})
        res.json({status:true,data:phones})
    } catch (error) {
        return res.json({status:false, msg:error.message})
    }
}





module.exports={PhonePost,PhoneGet}

