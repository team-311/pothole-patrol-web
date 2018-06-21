const router = require('express').Router()
const { Pothole } = require('../db/models')

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1
  const limit = process.env.POTHOLES_PAGE_SIZE || 25
  const offset = (page - 1) * limit

  const {count, rows: requests} = await Pothole.findAndCountAll({
    order: [['createdAt', 'DESC']],
    offset,
    limit,
  })

  const lastPage = Math.ceil(count / limit) // round up to account for additional items

  res.json({
    count,
    requests,
    currentPage: offset,
    lastPage,
  })
})

module.exports = router
