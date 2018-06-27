const router = require('express').Router({ mergeParams: true })
const Sequelize = require('sequelize')
const { Order, Pothole } = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1
  const limit = 10
  const offset = (page - 1) * limit

  const orders = await Order.findAll({
    order: [['createdAt', 'DESC'], ['id', 'ASC']],
    offset,
    limit,
    where: {
      crewId: req.params.id,
    },
    include: [{model: Pothole, attributes: ['id', 'streetAddress']}],
  })
  const count = orders.length
  const lastPage = Math.ceil(count / limit)

  res.json({
    count,
    orders,
    currentPage: offset + 1,
    lastPage,
  })
})

// single order
router.get('/:orderId', async (req, res, next) => {
  const order = await Order.findOne({
    where: {
      id: req.params.orderId,
      crewId: req.params.id,
    },
    include: [{model: Pothole, attributes: ['id', 'imageUrl', 'description', 'placement', 'status', 'completionDate', 'latitude', 'longitude', 'streetAddress', 'zip']}],
  })

  if (!order) {
    next()
  } else {
    res.json(order)
  }

})

router.put('/:orderId/next', async (req, res, next) => {
  const { lat, lon } = req.body
  const order = await Order.findById(req.params.orderId)
  if (!order) {
    next() // go to 404
  } else {
    // Look for the highest priority item that is within x radius
    let nextPothole = await Pothole.getNext(lat, lon)
    if (!nextPothole) {
      // If nothing is found, find the next closest pothole (distance)
      nextPothole = await Pothole.getClosest(lat, lon)
    }
    nextPothole = await nextPothole.setOrder(order)
    res.json(nextPothole)
  }
})

