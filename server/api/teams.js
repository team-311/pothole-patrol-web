const router = require('express').Router();
const { Crew } = require('../db/models');

router.get('/:crewId', async (req, res, next) => {
  try {
    const crewId = req.params.crewId;
    const crew = await Crew.findById(crewId);
    res.json(crew);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
