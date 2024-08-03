const express = require('express');
const userController = require('../controllers/user.js')
const authMiddleware = require('../middleware/auth.js')

const router = express.Router()
router.get('/getUser', authMiddleware, userController.user)

router.post('/createUser', userController.createUSer)

router.post('/loginUser', userController.loginUSer)

router.post('/logout', userController.logout)

module.exports = router  