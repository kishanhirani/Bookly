const mongoose = require('mongoose');

const teaSchema = new mongoose.Schema({
    count_1: Number,
    count_2: Number,
}, { timestamps: true });

const Tea = mongoose.model('Tea', teaSchema);
module.exports = Tea;