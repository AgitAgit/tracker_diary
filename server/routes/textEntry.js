const TextEntry = require('../models/textEntry')
const express = require('express')
const authUser = require('../middleware/auth')
const router = express.Router()

router.post('/', authUser, async (req, res) => {
    try {
        const { user } = req;
        const { text, title } = req.body;
        const newTextEntry = new TextEntry({
            user_id: user.id,
            title: title,
            free_text: text
        })
        const result = await newTextEntry.save()
        res.json({ result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
})

router.get('/', authUser, async (req, res) => {
    try {
        const { user } = req;
        const result = await TextEntry.find({ user_id: user.id })
        res.json({ text_entries: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
})

module.exports = router
