const router = require('express').Router()
const { Order, User, Crew, Pothole } = require('../db/models')
const Op = require('sequelize').Op


router.get('/', async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = process.env.ORDERS_PAGE_SIZE || 25;
    const offset = (page - 1) * limit;

    const { count, rows: orders } = await Order.findAndCountAll({
      order: [['createdAt', 'DESC'], ['id', 'ASC']],
      offset,
      limit,
      include: [User, Crew],
    });

    const lastPage = Math.ceil(count / limit); // round up to account for additional items

    res.json({
      count,
      orders,
      currentPage: page,
      lastPage,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/open', async (req, res, next) => {
  try {
    const data = await Order.findAll({
      where: {
        status: {
          [Op.or]: ["Requested", "In Progress"]
        },
      }, include: [User, Crew, Pothole]
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Order.findById(req.params.id, {
      include: [User, Crew, Pothole],
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);
    await Order.update(
      { ...order, crewId: req.body.crew.id },
      {
        where: { id: req.params.id },
        retuning: true,
      }
    );
    let updatedOrder = await Order.findById(req.params.id, {
      include: [User, Crew, Pothole],
    });
    res.json({
      updatedOrder,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
