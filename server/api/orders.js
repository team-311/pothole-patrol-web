const router = require('express').Router()
const { Order, User, Crew, Pothole} = require('../db/models')


router.get('/', async (req, res, next) => {
  try {
    const page = req.query.page || 1
    const limit = process.env.ORDERS_PAGE_SIZE || 25
    const offset = (page - 1) * limit

    const { count, rows: orders } = await Order.findAndCountAll({
      order: [['createdAt', 'DESC'], ['id', 'ASC']],
      offset,
      limit,
    })

    const lastPage = Math.ceil(count / limit) // round up to account for additional items

    res.json({
      count,
      orders,
      currentPage: offset,
      lastPage,
    })
  } catch (err) {next(err)}
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Order.findById(req.params.id, {
      include: [User, Crew, Pothole]
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
