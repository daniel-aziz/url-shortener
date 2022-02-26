const mongoose = require('mongoose')
autoIncrement = require('mongoose-auto-increment');

/* Database Connection */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to DB")
});

/* Connection instance */ 
let connection = mongoose.createConnection(process.env.MONGO_URI)

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

