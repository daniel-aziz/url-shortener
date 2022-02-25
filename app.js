const express = require('express');
const app = express();
require('dotenv').config();
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UrlModel = require('./models/url')


// Connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to DB")
});

// Allow server to use JSOn
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


// API

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World!" })
})

app.post('/api/shorturl', (req, res) => {
    const newUrl = { fullUrl: req.body.fullUrl, shortUrl:  getShortNumber()}
    new UrlModel(newUrl).save((err, data) => {
        if (err) return res.status(401).json(err.message);
        return res.status(200).json(data);
    })

})

app.get('/api/shorturl/:shortUrl', (req, res) => {
try {
    UrlModel.findOne({shortUrl:req.params.shortUrl},(err,data)=>{
        if (err) return res.status(401).json(err.message);
        var url;
        var arr = data
        console.log(arr.fullUrl)
        url = arr.fullUrl;
       //return res.status(200).json(data.fullUrl);
       res.writeHead(302, {'Location': url}).end()
       return res;
    })
} catch (e)
 { console.log(e)}
 
})

// get random number function
function getShortNumber() {
    return Math.round(Math.random()*10000).toString() ;
}


// Setup server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at port ${process.env.SERVER_PORT}...`)
})