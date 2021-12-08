const Users = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto=require('crypto')
const nodemailer=require('nodemailer')
const client=require('twilio')(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN)

var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    },
    tls:{
        rejectUnauthorized:false
    }
})

const registerEmailCtrl = async (req, res) => {
    const { name, email, password } = req.body
    if (!email || !name || !password) {
        return res.json({ status: false, msg: "Invalid creadentials" })
    }
    try {
        const check = await Users.findOne({ email })
        if (check) {
            return res.json({ status: false, msg: "User already exist" })
        }
        const hashpass = await bcrypt.hash(password, 11)
        const User = new Users({
            name, email, password: hashpass,emailToken:crypto.randomBytes(64).toString('hex')
        })
        const user = await User.save()
       var mailOptions={
           from: '"Classified Verification" <siyamcoder11@gmail.com>',
           to:user.email,
           subject:'Confirm your classified registration',
           html:`<h2>Hi ${user.name}, Please confirm your mail</h2> <br> <a href="http://${req.headers.host}/verifyemail?token=${user.emailToken}">Click here to verify</a>`
       }
       transporter.sendMail(mailOptions,(err,info)=>{
           if(err){
               console.log(err)
              return res.json({status:false,msg:"An error accured"})
           }else{
              return res.json({ status: true, msg: "An email sent to your gmail ,Please verify account" })
           }
       })
    } catch (error) {
        res.json({ status: false, msg: error.message })
    }
}

const registerPhoneCtrl = async (req, res) => {
    const { name, phone, password } = req.body
    if (!phone || !name || !password) {
        return res.json({ status: false, msg: "Invalid creadentials" })
    }
    try {
        const check = await Users.findOne({ phone })
        if (check) {
            return res.json({ status: false, msg: "User already exist" })
        }
        const hashpass = await bcrypt.hash(password, 11)
        const User = new Users({
            name, phone, password: hashpass
        })
        const user = await User.save()
        client.verify.services(process.env.SERVICE_ID).verifications.create({to:phone,channel:"sms"}).then((data)=>{

            res.json({status:true,msg:"An OTP sent to your phone ,Please verify account"})
        }).catch((err)=>res.json({ status: false, msg: err.message }))

    } catch (error) {
        res.json({ status: false, msg: error.message })
    }
}
const verifyPhoneCtrl=async(req,res)=>{
    const {phone,code}=req.body
    try {
        
         const user= await Users.findOne({phone})
         if(!user){
            return res.json({status:false,msg:"Phone number isn't registered"})
         }
             client.verify.services(process.env.SERVICE_ID).verificationChecks.create({to:phone,code:code}).then(async(data)=>{
               if(data.status==="approved"){
                   user.isVerified=true
                   await user.save()
                   return res.json({status:true,msg:"Phone Verification Successfull"})
               }else{
                   return res.json({status:false,msg:"OTP code isn't valid"})
               }
             }).catch((err)=>res.json({ status: false, msg: err.message }))
         
    } catch (error) {
        res.json({status:false,msg:error.message})
    }
    
}

const verifyEmailCtrl=async(req,res)=>{
    const token= req.query.token
    try {
        
        const user= await Users.findOne({emailToken:token})
        if(user){
            user.emailToken=null
            user.isVerified=true
            await user.save()
            return res.json({status:true,msg:"Email Verification Successfull"})
        }else{
            res.json({status:false,msg:"Email Verification Error"})
        }
    } catch (error) {
        res.json({status:false,msg:error.message})
    }
    
}


const loginEmailCtrl = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ status: false, msg: "Invalid creadentials" })
    }
    try {
        const user = await Users.findOne({ email })
        if (!user) {
            return res.json({ status: false, msg: "User doesn't exist" })
        }
        if(!user.isVerified){
            return res.json({ status: false, msg: "Email isn't verified" })
        }
        const check = await bcrypt.compare(password, user.password)
        if (!check) {
            return res.json({ status: false, msg: "Password doesn't matched" })
        }
        const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ status: true, msg: "Login Successfull", token })
    } catch (error) {
        res.json({ status: false, msg: error.message })
    }
}
const loginPhoneCtrl = async (req, res) => {
    const { phone, password } = req.body
    if (!phone || !password) {
        return res.json({ status: false, msg: "Invalid creadentials" })
    }
    try {
        const user = await Users.findOne({ phone })
        if (!user) {
            return res.json({ status: false, msg: "User doesn't exist" })
        }
        if(!user.isVerified){
            return res.json({ status: false, msg: "Phone isn't verified" })
        }
        const check = await bcrypt.compare(password, user.password)
        if (!check) {
            return res.json({ status: false, msg: "Password doesn't matched" })
        }
        const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ status: true, msg: "Login Successfull", token })
    } catch (error) {
        res.json({ status: false, msg: error.message })
    }
}

module.exports = { registerEmailCtrl, loginEmailCtrl ,verifyEmailCtrl,registerPhoneCtrl,loginPhoneCtrl,verifyPhoneCtrl}