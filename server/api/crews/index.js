const router = require('express').Router()
const { isCrewMemberOrAdmin } = require('../middleware')
module.exports = router

router.use('/potholes', require('./potholes'))
router.use('/:id/orders', isCrewMemberOrAdmin, require('./orders'))
