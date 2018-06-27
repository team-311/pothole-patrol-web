const router = require('express').Router({ mergeParams: true })
const Sequelize = require('sequelize')
const { Order, Pothole } = require('../../db/models')
module.exports = router

router.put('/:potholeId/complete', async (req, res, next) => {
  const updates = {
    status: 'Completed',
    completionDate: new Date()
  }
  const [numRows, pothole] = await Pothole.update(updates, {
    where: {
      id: req.params.potholeId
    },
    returning: true,
    attributes: ['id', 'imageUrl', 'description', 'placement', 'status', 'completionDate', 'latitude', 'longitude', 'streetAddress', 'zip'],
  })

  res.json(pothole[0])
})
