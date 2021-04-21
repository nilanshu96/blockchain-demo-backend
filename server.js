const express = require('express');

const {generateBlock, generateValidBlock} = require('./block-chain');

const PORT = 3001;

const app = express();

app.use(express.json());

//cors policy for API
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
 
app.get("/", (req, res) => {
    res.send('Blockchain backend');
})

app.post("/generateValidBlock", (req, res) => {

    const {data, prevHash, prevIdx} = req.body;
    return res.json(generateValidBlock(data, prevHash, prevIdx));
})

app.post("/generateBlock", (req, res) => {

    const {data, prevHash, nonce, idx} = req.body;
    return res.json(generateBlock(data, prevHash, nonce, idx));
})

app.listen(PORT, () => {
    console.log('listening at port: ' + PORT);
})