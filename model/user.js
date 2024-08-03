const mongoose = require('mongoose')
const { use } = require('../routes')
const { string } = require('zod')

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    salt: String,
    email: {
        type: String,
        unique: true,
    },

})
const user = mongoose.model('user', userSchema)
module.exports = user