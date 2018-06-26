const router = require('express').Router()
const {User, Pothole} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id/potholes', async (req, res, next) => {
  const potholes = await Pothole.findAll({
    where: {
      reporterId: req.params.id,
    }
  })

  res.json(potholes)
})
