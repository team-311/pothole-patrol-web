const router = require('express').Router()
const { User, Pothole } = require('../db/models')
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

router.get('/:id/upvoted', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    let potholes = await user.getUpvoted({
      attributes: ['id', 'streetAddress', 'status']
    })
    res.json(potholes)
  } catch (err) {next(err)}
})
