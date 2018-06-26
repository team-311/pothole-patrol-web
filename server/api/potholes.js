const router = require('express').Router();
const { Pothole } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = process.env.POTHOLES_PAGE_SIZE || 25;
  const offset = (page - 1) * limit;

  const { count, rows: requests } = await Pothole.findAndCountAll({
    order: [['createdAt', 'DESC']],
    offset,
    limit,
  });

  const lastPage = Math.ceil(count / limit); // round up to account for additional items

  res.json({
    count,
    requests,
    currentPage: offset,
    lastPage,
  });
});

router.get('/nearby', async (req, res, next) => {
  try {
    const potholes = await Pothole.findNearby(req.query.lat, req.query.lon)
    res.json(potholes);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Pothole.findById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let response = await Pothole.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.json({
      message: 'Updated successfully',
      pothole: response[1][0],
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const pothole = {
    placement: req.body.placement,
    description: req.body.description || '',
    streetAddress: req.body.location.streetAddress,
    zip: req.body.location.zip,
    location: {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    },
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  if (req.user.id && !req.body.anonymous) pothole.reporterId = req.user.id;

  if (req.body.imageUrl) {
    cloudinary.v2.uploader.upload(req.body.imageUrl, async (err, photo) => {
      if (err) {
        // the request should not be rejected if the image hosting site is down
        console.error('Could not upload picture', err);
      } else {
        pothole.imageUrl = photo.url;
      }
      const createdPothole = await Pothole.create(pothole);
      res.json(createdPothole.id);
    });
  } else {
    const createdPothole = await Pothole.create(pothole);
    res.json(createdPothole.id);
  }
});

module.exports = router;
