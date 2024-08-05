const mongoose = require('mongoose')

const teaSchema = new mongoose.Schema({
    userId: String,
    count: Number,
    time: Date,
})
const tea = mongoose.model('tea', teaSchema)
module.exports = tea