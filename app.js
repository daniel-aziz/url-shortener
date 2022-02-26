'use strict';

// Import cases
require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const Url = require('./models/url');



// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Export views
app.use('/public', express.static(`${process.cwd()}/public`));
app.get("/", (req, res) => {
    res.sendFile(process.cwd()  + '/views/index.html');
});


// API's
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello World!" });
});



app.post('/api/shorturl/new', (req, res) => {
    let reqUrl = req.body.original_url;
    let urlRegex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)

    if (!reqUrl.match(urlRegex)) return res.status(401).json({ error: "Invalid URL!" })

    let objUrl = new Url({ original_url: reqUrl });
    objUrl.save((err, data) => {
        if (err) res.status(200).json({ error: err.message });
        res.status(200).json(data);
    })

})


app.get('/api/shorturl/:input', (req, res) => {
    let input = req.params.input;

    Url.findOne({ short_url: parseInt(input) }, (err, data) => {
        console.log(data)
        if (err && data == undefined) return res.status(401).json({ error: "URL Not found!" })
        res.writeHead(302, { 'Location': data.original_url }).end()
        return res;

    })

})



// Server init 
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at port ${process.env.SERVER_PORT}`);
});

