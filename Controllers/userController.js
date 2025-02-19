const User = require("../Models/userModel")
const jwt = require('jsonwebtoken')

exports.userRegister = async (req, res) => {
    try {
        const { email, name, password } = req.body
        if (!email || !name || !password) {
            res.status(406).json("All fields required")
        } else {
            const newUser = new User({ email, name, password })
            await newUser.save()
            res.status(201).json(newUser)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const existing = await User.findOne({ email, password })
        if(existing) {
            const token = jwt.sign({userId:existing._id}, process.env.SECRET_KEY)
            res.status(200).json({token, name:existing.name})
        } else {
            res.status(406).json("Invalid email or password")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}