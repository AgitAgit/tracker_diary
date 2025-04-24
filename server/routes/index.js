const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/textEntry', require('./textEntry'))

module.exports = router