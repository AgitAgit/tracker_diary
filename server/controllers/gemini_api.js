const { GoogleGenAI } = require('@google/genai')
require('dotenv').config();

const api_key = process.env.GEMINI_API_KEY_2025_04
const ai = new GoogleGenAI({ apiKey: api_key })

async function promptGemini(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
        })
        const text = response.candidates[0].content.parts[0].text
        return text;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { promptGemini }