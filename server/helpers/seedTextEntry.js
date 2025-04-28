// I need a script that:
// seeds a user with 100 diary entries based on some character

// Get the latest textEntries DONE (created a function)
// Get the described_day_date/date of the latest textEntry
// Prompt gemini for a diary entry based on the former entry and the character

const TextEntry = require('../models/textEntry')
const express = require('express')
const { promptGemini } = require('../controllers/gemini_api')
const { getLatestEntries } = require('../controllers/textEntry')

const TEST_CHARACTER_DEFINITION = "{Name: Test, Personality:Timid, Sex: Male, Age:30, Occupation:Auto mechanic}"

async function seedTextEntry(req, res, next) {
    try {
        const { user } = req;
        const today = Date.now()
        const latestEntry = await getLatestEntries(user.id, 1);
        const geminiResponse = await promptGemini(`you are writing a diary entry for the following character:${TEST_CHARACTER_DEFINITION}, his last entry was:{${latestEntry.free_text}}. Generate a new entry that makes sense in this context. It should be between 50 and 250 words long. The entry itself should always start and end with @@@`);
        const text = geminiResponse.split('@@@')[1]
        await saveEntry(user.id, null, text, today)
        next();
    } catch (error) {
        console.log(error)
    }
}

async function saveEntry(user_id, title, free_text, described_day_date) {
    const newTextEntry = new TextEntry({
        user_id,
        title: title,
        free_text,
        described_day_date
    })
    const result = await newTextEntry.save()
}

module.exports = { seedTextEntry }
