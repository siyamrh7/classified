const Users = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerCtrl = async (req, res) => {
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
            name, email, password: hashpass
        })
        const user = await User.save()
        const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ status: true, msg: "Registration Successfull", token })
    } catch (error) {
        res.json({ status: false, msg: error.message })
    }
}


const loginCtrl = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ status: false, msg: "Invalid creadentials" })
    }
    try {
        const user = await Users.findOne({ email })
        if (!user) {
            return res.json({ status: false, msg: "User doesn't exist" })
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


module.exports = { registerCtrl, loginCtrl }