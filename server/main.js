const express = require('express');
const routes = require('./routes/index')

const app = express();
const port = process.env.PORT || 3000;



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