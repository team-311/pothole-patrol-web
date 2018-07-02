const router = require('express').Router();
const { Pothole, User } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', async (req, res, next) => {
  // pagination
  const page = Number(req.query.page) || 1;
  const limit = process.env.POTHOLES_PAGE_SIZE || 25;
  const offset = (page - 1) * limit;
  const options = {
    order: [['createdAt', 'DESC'], ['id', 'ASC']],
    offset,
    limit,
    where: {},
  }

  // filters
  if (req.query.status) options.where.status = { [Op.iLike]: `${req.query.status}%` }
  if (req.query.ward) options.where.ward = req.query.ward

  // sorting
  if (req.query.sort) {
    const [criteria, direction] = req.query.sort.split('.')
    if (criteria.toLowerCase() === 'opened') {
      options.order = [['createdAt', direction || 'DESC'], ['id', 'ASC']] // including ID to break ties
    }
  }

  const { count, rows: requests } = await Pothole.findAndCountAll(options);
  const lastPage = Math.ceil(count / limit); // round up to account for additional items

  res.json({
    count,
    requests,
    currentPage: page,
    lastPage,
  });
});

router.get('/nearby', async (req, res, next) => {
  try {
    const potholes = await Pothole.findNearby(req.query.lat, req.query.lon);
    res.json(potholes);
  } catch (err) {
    next(err);
  }
});

router.get('/allopen', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        status: {
          [Op.like]: 'Open%',
        },
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/allopen/priority', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        status: {
          [Op.like]: 'Open%',
        },
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/allinprogress', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        status: 'In-progress'
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/allclosed', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        status: 'Completed'
      }
    })
    res.json(data)
  } catch (err) {
    next(err);
  }
});
router.get('/allclosed/lastweeknum', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        completionDate: {
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        }
      }
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/allclosed/lastweek', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        completionDate: {
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        }
      }
    })
    let dataObj1 = { time: 1, count: 0 };
    let dataObj2 = { time: 2, count: 0 };
    let dataObj3 = { time: 3, count: 0 };
    let dataObj4 = { time: 4, count: 0 };
    let dataObj5 = { time: 5, count: 0 };
    let dataObj6 = { time: 6, count: 0 };
    let dataObj7 = { time: 7, count: 0 };
    let returnArr = [
      dataObj1,
      dataObj2,
      dataObj3,
      dataObj4,
      dataObj5,
      dataObj6,
      dataObj7,
    ];
    for (let i = 0; i < data.length; i++) {
      if (new Date() - data[i].completionDate < 1 * 24 * 60 * 60 * 1000) {
        dataObj1.count++;
      } else if (new Date() - data[i].completionDate < 2 * 24 * 60 * 60 * 1000) {
        dataObj2.count++;
      } else if (new Date() - data[i].completionDate < 3 * 24 * 60 * 60 * 1000) {
        dataObj3.count++;
      } else if (new Date() - data[i].completionDate < 4 * 24 * 60 * 60 * 1000) {
        dataObj4.count++;
      } else if (new Date() - data[i].completionDate < 5 * 24 * 60 * 60 * 1000) {
        dataObj5.count++;
      } else if (new Date() - data[i].completionDate < 6 * 24 * 60 * 60 * 1000) {
        dataObj6.count++;
      } else {
        dataObj7.count++;
      }
    }
    res.json(returnArr);
  } catch (err) {
    next(err);
  }
});

router.get('/allclosed/lastmonth', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        status: 'Completed',
        completionDate: {
          [Op.gt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
        }
      }
    })
    res.json(data)
  } catch (err) {
    next(err);
  }
});

router.get('/lastweek/byday', async (req, res, next) => {
  try {
    let dataObj1 = { time: 1, count: 0 };
    let dataObj2 = { time: 2, count: 0 };
    let dataObj3 = { time: 3, count: 0 };
    let dataObj4 = { time: 4, count: 0 };
    let dataObj5 = { time: 5, count: 0 };
    let dataObj6 = { time: 6, count: 0 };
    let dataObj7 = { time: 7, count: 0 };
    let returnArr = [
      dataObj1,
      dataObj2,
      dataObj3,
      dataObj4,
      dataObj5,
      dataObj6,
      dataObj7,
    ];
    const data = await Pothole.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    for (let i = 0; i < data.length; i++) {
      if (new Date() - data[i].createdAt < 1 * 24 * 60 * 60 * 1000) {
        dataObj1.count++;
      } else if (new Date() - data[i].createdAt < 2 * 24 * 60 * 60 * 1000) {
        dataObj2.count++;
      } else if (new Date() - data[i].createdAt < 3 * 24 * 60 * 60 * 1000) {
        dataObj3.count++;
      } else if (new Date() - data[i].createdAt < 4 * 24 * 60 * 60 * 1000) {
        dataObj4.count++;
      } else if (new Date() - data[i].createdAt < 5 * 24 * 60 * 60 * 1000) {
        dataObj5.count++;
      } else if (new Date() - data[i].createdAt < 6 * 24 * 60 * 60 * 1000) {
        dataObj6.count++;
      } else {
        dataObj7.count++;
      }
    }
    res.json(returnArr);
  } catch (err) {
    next(err);
  }
});

router.get('/lastweek', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/lastmonth', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/lastmonth/byday', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/allclosed/timetocompletion', async (req, res, next) => {
  try {
    let dataObj1 = { time: 1, count: 0 };
    let dataObj2 = { time: 2, count: 0 };
    let dataObj3 = { time: 3, count: 0 };
    let dataObj4 = { time: 4, count: 0 };
    let dataObj5 = { time: 5, count: 0 };
    let dataObj6 = { time: 6, count: 0 };
    let dataObj7 = { time: 7, count: 0 };
    let returnArr = [dataObj1, dataObj2, dataObj3, dataObj4, dataObj5, dataObj6, dataObj7];
    const data = await Pothole.findAll({
      where: {
        status: 'Completed',
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].completionDate - data[i].createdAt < 1 * 24 * 60 * 60 * 1000) {
        dataObj1.count++;
      } else if (
        data[i].completionDate - data[i].createdAt <
        2 * 24 * 60 * 60 * 1000
      ) {
        dataObj2.count++;
      } else if (
        data[i].completionDate - data[i].createdAt <
        3 * 24 * 60 * 60 * 1000
      ) {
        dataObj3.count++;
      } else if (
        data[i].completionDate - data[i].createdAt <
        4 * 24 * 60 * 60 * 1000
      ) {
        dataObj4.count++;
      } else if (
        data[i].completionDate - data[i].createdAt <
        5 * 24 * 60 * 60 * 1000
      ) {
        dataObj5.count++;
      } else if (
        data[i].completionDate - data[i].createdAt <
        6 * 24 * 60 * 60 * 1000
      ) {
        dataObj6.count++;
      } else {
        dataObj7.count++;
      }
    }
    res.json(returnArr);
  } catch (err) {
    next(err);
  }
});

router.get('/byward/:id', async (req, res, next) => {
  try {
    const data = await Pothole.findAll({
      where: {
        ward: req.params.id
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Pothole.findById(req.params.id, { include: 'upvoters' });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/upvote', async (req, res, next) => {
  console.log('hitting the upvote route')
  try {
    const user = await User.findById(req.body.userId)
    const pothole = await Pothole.findById(req.body.potholeId, { include: 'upvoters' })
    await user.addUpvoted(pothole)
    const upvoters = await pothole.getUpvoters()
    pothole.incrementUpvotes()
    console.log('pothole', pothole)
    res.json({ pothole, upvoters })
  } catch (err) { next(err) }
})

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

//helper function for adding upvoters
const upvotePothole = async (user, pothole) => {
  if (user) {
    await user.addUpvoted(pothole)
  }
}

router.post('/', async (req, res, next) => {
  let user
  const pothole = {
    placement: req.body.placement,
    description: req.body.description || '',
    streetAddress: req.body.location.streetAddress,
    zip: req.body.location.zip,
    location: {
      type: 'Point',
      coordinates: [req.body.location.longitude, req.body.location.latitude],
    },
    latitude: req.body.location.latitude,
    longitude: req.body.location.longitude,
  };
  if (req.user.id && !req.body.anonymous) {
    pothole.reporterId = req.user.id
    user = await User.findById(req.user.id)

  }

  if (req.body.imageUrl) {
    cloudinary.v2.uploader.upload(req.body.imageUrl, async (err, photo) => {
      if (err) {
        // the request should not be rejected if the image hosting site is down
        console.error('Could not upload picture', err);
      } else {
        pothole.imageUrl = photo.url;
      }
      const createdPothole = await Pothole.create(pothole);
      upvotePothole(user, createdPothole)
      res.json(createdPothole.id);
    });
  } else {
    const createdPothole = await Pothole.create(pothole);
    upvotePothole(user, createdPothole)
    res.json(createdPothole.id);
  }
});

module.exports = router;
