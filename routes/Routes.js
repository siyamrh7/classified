const express = require('express')
const { registerCtrl, loginCtrl } = require('../controllers/AuthCtrl')
const router = express.Router()

router.post('/api/signup', registerCtrl)
router.post('/api/signin', loginCtrl)
router.get('/', (req, res) => {
    res.send("Server is running")
})
module.exports = router