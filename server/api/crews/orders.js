const router = require('express').Router({ mergeParams: true });
const Op = require('sequelize').Op;
const { Order, Pothole, Crew } = require('../../db/models');
const moment = require('moment')
module.exports = router;

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const crew = await Crew.findById(req.params.id)

  const orders = await Order.findAll({
    order: [['createdAt', 'DESC'], ['id', 'ASC']],
    offset,
    limit,
    where: {
      crewId: req.params.id,
      status: 'Completed',
    },
    include: [{ model: Pothole, attributes: ['id', 'serviceNumber', 'streetAddress', 'zip'] }],
  });
  const count = orders.length;
  const lastPage = Math.ceil(count / limit);

  res.json({
    count,
    orders,
    currentPage: offset + 1,
    lastPage,
    crew: crew.name,
  });
});

router.get('/completed', async (req, res, next) => {
  const limit = 500;
  const crew = await Crew.findById(req.params.id)
  const firstDayOfWeek = moment().day(0).toDate()

  const thisWeeksOrdersP = Order.findAll({
    order: [['dateCompleted', 'DESC'], ['id', 'ASC']],
    limit,
    where: {
      crewId: req.params.id,
      status: 'Completed',
      dateCompleted: {
        [Op.gte]: firstDayOfWeek
      }
    },
    include: [{ model: Pothole, attributes: ['id', 'serviceNumber', 'streetAddress', 'zip'] }],
  });

  const previousOrdersP = Order.findAll({
    order: [['dateCompleted', 'DESC'], ['id', 'ASC']],
    limit,
    where: {
      crewId: req.params.id,
      status: 'Completed',
      dateCompleted: {
        [Op.lt]: firstDayOfWeek
      }
    },
    include: [{ model: Pothole, attributes: ['id', 'serviceNumber', 'streetAddress', 'zip'] }],
  });

  const [thisWeeksOrders, previousOrders] = await Promise.all([thisWeeksOrdersP, previousOrdersP])
  const sumPotholes = (a, b) => a + b.potholes.length
  const totalPotholesThisWeek = thisWeeksOrders.reduce(sumPotholes, 0)
  const totalPotholesPrevious = previousOrders.reduce(sumPotholes, 0)

  res.json({
    total: thisWeeksOrders.length + previousOrders.length,
    thisWeeksOrders: thisWeeksOrders || [],
    totalPotholesThisWeek,
    previousOrders: previousOrders || [],
    totalPotholesPrevious,
    crew: crew.name,
  });
});

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.createOrderForCrew(req.params.id)
    const orderWithPothole = await Order.findById(newOrder.id, {
      include: [{model: Pothole, attributes: ['id', 'imageUrl', 'description', 'placement', 'status', 'completionDate', 'latitude', 'longitude', 'streetAddress', 'zip']}],
    })

    res.json(orderWithPothole)
  } catch (error) {
    next(error)
  }
})

router.get('/today', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        crewId: req.params.id,
        status: {
          [Op.or]: ['Requested', 'In Progress'],
        },
      },
      order: [['id', 'ASC']],
      include: [
        {
          model: Pothole,
          attributes: [
            'id',
            'imageUrl',
            'description',
            'placement',
            'status',
            'completionDate',
            'latitude',
            'longitude',
            'streetAddress',
            'zip',
          ],
        },
      ],
    });

    if (!order) {
      res.json({});
    } else {
      res.json(order);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:orderId', async (req, res, next) => {
  const order = await Order.findOne({
    where: {
      id: req.params.orderId,
      crewId: req.params.id,
    },
    include: [
      {
        model: Pothole,
        attributes: [
          'id',
          'imageUrl',
          'description',
          'placement',
          'status',
          'completionDate',
          'latitude',
          'longitude',
          'streetAddress',
          'zip',
        ],
      },
    ],
  });

  if (!order) {
    next();
  } else {
    res.json(order);
  }
});

router.put('/:orderId', async (req, res, next) => {
  try {
    const options = {
      status: req.body.status,
    };
    if (options.status === 'Completed') options.dateCompleted = new Date();
    await Order.update(options, {
      where: {
        id: req.params.orderId,
      },
    });

    const order = await Order.findById(req.params.orderId, {
      include: [
        {
          model: Pothole,
          attributes: [
            'id',
            'imageUrl',
            'description',
            'placement',
            'status',
            'completionDate',
            'latitude',
            'longitude',
            'streetAddress',
            'zip',
          ],
        },
      ],
    });

    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.put('/:orderId/next', async (req, res, next) => {
  const { lat, lon } = req.body;
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    next(); // go to 404
  } else {
    // Look for the highest priority item that is within x radius
    let nextPothole = await Pothole.getNext(lat, lon);
    if (!nextPothole) {
      // If nothing is found, find the next closest pothole (distance)
      nextPothole = await Pothole.getClosest(lat, lon);
    }
    nextPothole = await nextPothole.setOrder(order);
    res.json(nextPothole);
  }
});
