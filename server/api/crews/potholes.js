const router = require('express').Router()
const { Pothole } = require('../../db/models')
module.exports = router

router.get('/next', async (req, res, next) => {
  const { lat, lon } = req.query

  // Look for the highest priority item that is within x radius
  const highestPriority = await Pothole.getNext(lat, lon)
  if (highestPriority.length === 1) {
    res.json(highestPriority)
  } else {
    // If nothing is found, find the next closest pothole (distance)
    const closestPothole = await Pothole.getClosest(lat, lon)
    res.json(closestPothole)
  }
})
