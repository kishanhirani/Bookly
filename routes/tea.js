const express = require('express');

const router = express.Router()

const authMiddleware = require('../middleware/auth.js')

const teaController = require('../controllers/tea.js')

router.post('/addTea', authMiddleware, teaController.addTea)
router.post('/getTea', authMiddleware, teaController.getTea)
router.post('/updateTea', authMiddleware, teaController.updateTea)

module.exports = router     