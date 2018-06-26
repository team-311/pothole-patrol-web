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

// router.get('/:id', async (req, res, next) => {
//   try {
//     const data = await Pothole.findById(req.params.id);
//     res.json(data);
//   } catch (err) {
//     next(err);
//   }
// });

router.get('/allopen', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        status: {
          [Op.like]: 'Open%',
        }
      }
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/allclosed', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        status: 'Closed'
      }
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/lastweek/byday', async (req, res, next) => {
  try {
    let dataObj1 = { time: 1, count: 0 }
    let dataObj2 = { time: 2, count: 0 }
    let dataObj3 = { time: 3, count: 0 }
    let dataObj4 = { time: 4, count: 0 }
    let dataObj5 = { time: 5, count: 0 }
    let dataObj6 = { time: 6, count: 0 }
    let dataObj7 = { time: 7, count: 0 }
    let returnArr = [dataObj1, dataObj2, dataObj3, dataObj4, dataObj5, dataObj6, dataObj7]
    const data = await Pothole.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(new Date() - (7 * 24 * 60 * 60 * 1000))
        }
      }
    })
    for (let i = 0; i < data.length; i++) {
      if ((new Date() - data[i].createdAt) < (1 * 24 * 60 * 60 * 1000)) {
        dataObj1.count++
      } else if ((new Date() - data[i].createdAt) < (2 * 24 * 60 * 60 * 1000)) {
        dataObj2.count++
      } else if ((new Date() - data[i].createdAt) < (3 * 24 * 60 * 60 * 1000)) {
        dataObj3.count++
      } else if ((new Date() - data[i].createdAt) < (4 * 24 * 60 * 60 * 1000)) {
        dataObj4.count++
      } else if ((new Date() - data[i].createdAt) < (5 * 24 * 60 * 60 * 1000)) {
        dataObj5.count++
      } else if ((new Date() - data[i].createdAt) < (6 * 24 * 60 * 60 * 1000)) {
        dataObj6.count++
      } else {
        dataObj7.count++
      }
    }
    res.json(returnArr)
  } catch (err) {
    next(err)
  }
})

router.get('/lastweek', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(new Date() - (7 * 24 * 60 * 60 * 1000))
        }
      }
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/lastmonth', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(new Date() - (30 * 24 * 60 * 60 * 1000)),
        }
      }
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/lastmonth/byday', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(new Date() - (30 * 24 * 60 * 60 * 1000)),
        }
      }
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/allclosed/timetocompletion', async (req, res, next) => {
  try {
    let dataObj1 = { time: 1, count: 0 }
    let dataObj2 = { time: 2, count: 0 }
    let dataObj3 = { time: 3, count: 0 }
    let dataObj4 = { time: 4, count: 0 }
    let dataObj5 = { time: 5, count: 0 }
    let returnArr = [dataObj1, dataObj2, dataObj3, dataObj4, dataObj5]
    const data = await Pothole.findAll({
      where: {
        status: 'Closed'
      }
    })

    for (let i = 0; i < data.length; i++) {
      if ((data[i].updatedAt - data[i].createdAt) < (3 * 24 * 60 * 60 * 1000)) {
        dataObj1.count++
      } else if ((data[i].updatedAt - data[i].createdAt) < (4 * 24 * 60 * 60 * 1000)) {
        dataObj2.count++
      } else if ((data[i].updatedAt - data[i].createdAt) < (5 * 24 * 60 * 60 * 1000)) {
        dataObj3.count++
      } else if ((data[i].updatedAt - data[i].createdAt) < (6 * 24 * 60 * 60 * 1000)) {
        dataObj4.count++
      } else {
        dataObj5.count++
      }
    }
    res.json(returnArr)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
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
