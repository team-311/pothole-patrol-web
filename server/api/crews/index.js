const router = require('express').Router()
const { isCrewMemberOrAdmin } = require('../middleware')
module.exports = router

router.use('/directions', require('./directions'))
router.use('/:id/potholes', isCrewMemberOrAdmin, require('./potholes'))
router.use('/:id/orders', isCrewMemberOrAdmin, require('./orders'))
