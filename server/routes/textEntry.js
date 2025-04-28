const TextEntry = require('../models/textEntry')
const express = require('express')
const authUser = require('../middleware/auth')
const router = express.Router()
const { getLatestEntries } = require('../controllers/textEntry')
const { seedTextEntry } = require('../helpers/seedTextEntry')

router.post('/', authUser, async (req, res) => {
    try {
        const { user } = req;
        const { text, title, described_day_date } = req.body;
        const date = described_day_date ? new Date(described_day_date) : Date.now()
        const newTextEntry = new TextEntry({
            user_id: user.id,
            title: title,
            free_text: text,
            described_day_date: date
        })
        const result = await newTextEntry.save()
        res.json({ result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
})


router.get('/latestEntries/:limit', authUser, async (req, res) => {
    try {
        const { user } = req;
        const limit = parseInt(req.params.limit)
        const result = await getLatestEntries(user.id, limit)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
})

router.get('/seed', authUser, seedTextEntry, async (req, res) => {
    try {
        res.json({})
    } catch (error) {
        
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
