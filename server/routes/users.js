const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')

async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error("Error hashing password:", error);
    }
}

router.post('/create', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await hashPassword(password)

        const result = await User.create({
            user_name: username,
            password: hashedPassword
        })
        res.json({ message: "user created", result })
    } catch (error) {
        console.log(error);
        res.json({ message: "The server failed to create a new user" })
    }
})

module.exports = router