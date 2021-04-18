const express = require('express');

const PORT = 3001;

const app = express();
 
app.get("/", (req, res) => {
    res.send('Blockchain backend');
})


app.listen(PORT, () => {
    console.log('listening at port: ' + PORT);
})