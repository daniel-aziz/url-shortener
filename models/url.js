const mongoose = require('mongoose')
autoIncrement = require('mongoose-auto-increment');

const URI = "mongodb+srv://yomama:JPgGSXEsOKjzCdJE@cluster0.6bckt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

/* Database Connection */
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to DB")
});

/* Connection instance */ 
let connection = mongoose.createConnection(URI)

/* Initialize autoincrament with connection */ 
autoIncrement.initialize(connection);

/* Created a url schema */ 
const urlSchema = new mongoose.Schema({
    original_url: {type: String, required:  true},
    short_url: Number
})

/* exported url model & excuted autoincrament for url schema */ 
urlSchema.plugin(autoIncrement.plugin, { model: 'Url', field: 'short_url' });
module.exports = connection.model('Url', urlSchema)