const router = require('express').Router()
module.exports = router

router.use('/potholes', require('./potholes'))
