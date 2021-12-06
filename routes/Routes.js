const express=require('express')
const {registerCtrl,loginCtrl}=require('../controllers/AuthCtrl')
const router=express.Router()

router.post('/signup',registerCtrl)
router.post('/signin',loginCtrl)

module.exports=router