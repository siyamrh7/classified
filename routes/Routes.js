const express = require('express')
const { registerEmailCtrl, loginEmailCtrl ,verifyEmailCtrl,registerPhoneCtrl,loginPhoneCtrl,verifyPhoneCtrl} = require('../controllers/AuthCtrl')
const {PhonePost, PhoneGet} =require('../controllers/ProductCtrl')
const Authenticate=require('../middlewares/Authenticate')
const upload=require('../middlewares/upload')
const router = express.Router()


//auth
router.post('/api/emailsignup', registerEmailCtrl)
router.post('/api/phonesignup', registerPhoneCtrl)
router.post('/api/emailsignin', loginEmailCtrl)
router.post('/api/phonesignin', loginPhoneCtrl)

router.post('/verifyphone', verifyPhoneCtrl)
router.get('/verifyemail', verifyEmailCtrl)

//post product
router.post('/api/phonepost',Authenticate,upload, PhonePost)


//get product
router.get('/api/phoneget', PhoneGet)



router.get('/', (req, res) => {
    res.send("Server is running")
})
module.exports = router