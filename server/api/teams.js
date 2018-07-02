const router = require('express').Router();
const { Crew } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const crewList = await Crew.findAll();
    res.json(crewList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
