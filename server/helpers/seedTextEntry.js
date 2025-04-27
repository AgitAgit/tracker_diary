// I need a script that:
// seeds a user with 100 diary entries based on some character

// Get the latest textEntry
// Get the described_day_date/date of the latest textEntry
// Prompt gemini for a diary entry based on the former entry and the character

const TextEntry = require('../models/textEntry')
const express = require('express')
const { promptGemini } = require('../controllers/gemini_api')

async function seedTextEntry(req, res, next) {
    try {
        const { user } = req;
        await saveEntry(user.id, null, text, today)
        next();
    } catch (error) {
        console.log(error)
    }
}

async function saveEntry(user_id, title, free_text, described_day_date) {
    const newTextEntry = new TextEntry({
        user_id: user.id,
        title: title,
        free_text: text,
        described_day_date
    })
    const result = await newTextEntry.save()
}

module.exports = seedTextEntry
