'use strict';

// Import cases
require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const Url = require('./models/url')


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// API's
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});



app.post('/api/short/new', (req, res) => {
    let newUrl = new Url({original_url:  req.body.original_url})
    newUrl.save((err,data)=>{
        if (err) res.status(200).json({error : err.message})
        res.status(200).json(data)
    })
    
})

// Server init 
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at port ${process.env.SERVER_PORT}`);
});

