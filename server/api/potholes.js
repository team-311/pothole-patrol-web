const router = require('express').Router()
const { Pothole } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1
  const limit = process.env.POTHOLES_PAGE_SIZE || 25
  const offset = (page - 1) * limit

  const { count, rows: requests } = await Pothole.findAndCountAll({
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

router.get('/nearby', async (req, res, next) => {
  const latitude = Number(req.query.lat);
  const longitude = Number(req.query.lon);
  const latDelt = 0.01;
  const lonDelt = 0.01;
  try {
    const potholes = await Pothole.findAll({
      where: {
        latitude: {
          [Op.and]: [
            { [Op.gte]: latitude - latDelt },
            { [Op.lte]: latitude + latDelt },
          ],
        },
        longitude: {
          [Op.and]: [
            { [Op.gte]: longitude - lonDelt },
            { [Op.lte]: longitude + lonDelt },
          ],
        },
        status: {
          [Op.like]: 'Open%'
        }
      },
    });
    res.json(potholes)
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Pothole.findById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const pothole = {
    placement: req.body.placement,
    description: req.body.description || '',
    imageUrl: req.body.imageUrl.slice(0, 25),
    streetAddress: req.body.location.streetAddress,
    zip: req.body.location.zip,
    latitude: req.body.location.latitude,
    longitude: req.body.location.longitude,
  }

  const createdPothole = await Pothole.create(pothole)
  res.json(createdPothole.id)
})

module.exports = router
