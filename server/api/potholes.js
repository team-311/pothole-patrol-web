const router = require('express').Router();
const { Pothole } = require('../db/models');
const Sequelize = require('sequelize');
module.exports = router;

const Op = Sequelize.Op;

router.get('/:lat/:lon/', async (req, res, next) => {
  const latitude = Number(req.params.lat);
  const longitude = Number(req.params.lon);
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
