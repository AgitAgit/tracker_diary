const express = require('express');
const routes = require('./routes/index')
require('dotenv').config();
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 3000;


async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToDatabase();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Hello from the server?</h1>")
})

app.get('/test', (req, res) => {
    res.send("<h1>Hello from the server?</h1>")
})

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});