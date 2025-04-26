const express = require('express')
const authUser = require('../middleware/auth')
const { GoogleGenAI } = require('@google/genai')
require('dotenv').config();

const router = express.Router()
const api_key = process.env.GEMINI_API_KEY_2025_04
const ai = new GoogleGenAI({ apiKey: api_key })

// router.get('/test', async (req, res) => {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: "Explain what a coconut is in 100 words"
//     })
//     const text = response.candidates[0].content
//     res.json({ response })
// })

module.exports = router