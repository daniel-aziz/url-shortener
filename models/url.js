const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    fullUrl: String, 
    shortUrl: String
})

const Url = mongoose.model('Url',urlSchema)

exports.modules = Url;