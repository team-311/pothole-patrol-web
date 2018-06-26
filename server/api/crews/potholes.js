const router = require('express').Router()
const { Pothole } = require('../../db/models')
const axios = require('axios')
const polyline = require('@mapbox/polyline')
const sanitize = require('sanitize-html')
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

router.post('/directions', async (req, res, next) => {
  const { startLat, startLon, destLat, destLon } = req.body
  const { data: response } = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLon}&destination=${destLat},${destLon}&key=${process.env.GOOGLE_MAPS_API_KEY}`)

  if (response.status === 'OK') {
    const coords = polyline.decode(response.routes[0].overview_polyline.points).map(point => {
      return {
        latitude: point[0],
        longitude: point[1],
      }
    })

    const sanitizedSteps = response.routes[0].legs[0].steps.map(step => {
      return {...step, instructions: sanitize(step.html_instructions, {allowedTags: []})}
    })

    const directions = {
      coords,
      steps: sanitizedSteps,
    }
    res.json(directions)
  } else {
    const error = new Error('Could not locate route information')
    error.status = 500
    next(error)
  }
})
