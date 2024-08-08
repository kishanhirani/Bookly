const mongoose = require('mongoose')

const teaSchema = new mongoose.Schema({
    userId: String,
    count: Number,
    time: Date,
}, { timestamps: true })
const tea = mongoose.model('tea', teaSchema)
module.exports = tea