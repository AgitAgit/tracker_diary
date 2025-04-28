const TextEntry = require('../models/textEntry')
const express = require('express')
const authUser = require('../middleware/auth')

// router.post('/', authUser, async (req, res) => {
//     try {
//         const { user } = req;
//         const { text, title, described_day_date } = req.body;
//         const newTextEntry = new TextEntry({
//             user_id: user.id,
//             title: title,
//             free_text: text,
//             described_day_date
//         })
//         const result = await newTextEntry.save()
//         res.json({ result })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "internal server error" })
//     }
// })

// router.get('/', authUser, async (req, res) => {
//     try {
//         const { user } = req;
//         const result = await TextEntry.find({ user_id: user.id })
//         res.json({ text_entries: result })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "internal server error" })
//     }
// })

async function getLatestEntries(user_id, limit = 1) {
    try {
        const result = await TextEntry.find({})
            .sort({ described_day_date: -1 })
            .limit(limit)
        return result;
    } catch (error) {
        console.log(error)
    }
}



module.exports = { getLatestEntries }
