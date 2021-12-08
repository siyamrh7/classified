const express = require('express')
const { registerEmailCtrl, loginEmailCtrl ,verifyEmailCtrl,registerPhoneCtrl,loginPhoneCtrl,verifyPhoneCtrl} = require('../controllers/AuthCtrl')
const router = express.Router()

router.post('/api/emailsignup', registerEmailCtrl)
router.post('/api/phonesignup', registerPhoneCtrl)
router.post('/api/emailsignin', loginEmailCtrl)
router.post('/api/phonesignin', loginPhoneCtrl)

router.post('/verifyphone', verifyPhoneCtrl)
router.get('/verifyemail', verifyEmailCtrl)

router.get('/', (req, res) => {
    res.send("Server is running")
})
module.exports = router