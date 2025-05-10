const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/textEntry', require('./textEntry'))
router.use('/qaObject', require('./qaObject'))
router.use('/gemini_api', require('./gemini_api'))

module.exports = router