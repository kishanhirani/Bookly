const express = require('express');

const userRouter = require('./user.js')
const teaRouter = require('./tea.js')
const router = express.Router()

router.use('/user', userRouter)
router.use('/tea', teaRouter)

module.exports = router 