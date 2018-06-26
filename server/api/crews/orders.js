const router = require('express').Router({ mergeParams: true })
const Sequelize = require('sequelize')
const { Order, Pothole } = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1
  const limit = 10
  const offset = (page - 1) * limit

  const orders = await Order.findAll({
    order: [['createdAt', 'DESC']],
    offset,
    limit,
    where: {
      crewId: req.params.id,
    },
    attributes: { include: [[Sequelize.fn('COUNT', Sequelize.col('potholes.id')), 'numPotholes']]},
    include: [{model: Pothole, attributes: [], duplicating: false, required: false}],
    group: ['order.id'],
  })
  const count = orders.length
  const lastPage = Math.ceil(count / limit)

  res.json({
    count,
    orders,
    currentPage: offset,
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
    include: [{model: Pothole, attributes: ['id', 'imageUrl', 'description', 'placement', 'status', 'latitude', 'longitude', 'streetAddress', 'zip']}],
  })

  if (!order) {
    next()
  } else {
    res.json(order)
  }

})

