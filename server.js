const express = require('express');

const {generateBlock} = require('./block-chain');

const PORT = 3001;

const app = express();

app.use(express.json());
 
app.get("/", (req, res) => {
    res.send('Blockchain backend');
})

app.post("/generateBlock", (req, res) => {

    const {data, prevHash} = req.body;
    return res.json(generateBlock(data, prevHash));
})

app.listen(PORT, () => {
    console.log('listening at port: ' + PORT);
})