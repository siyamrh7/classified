const express=require('express')
const {registerCtrl,loginCtrl}=require('../controllers/AuthCtrl')
const router=express.Router()

router.post('/signup',registerCtrl)
router.post('/signin',loginCtrl)
router.get('/',(req,res)=>{
    res.send("Server is running")
})
module.exports=router