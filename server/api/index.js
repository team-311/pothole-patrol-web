const router = require('express').Router()
const { isCrewOrAdmin } = require('./middleware')
module.exports = router

router.use('/comments', require('./comments'));
router.use('/users', require('./users'))
router.use('/potholes', require('./potholes'))
router.use('/orders', isCrewOrAdmin, require('./orders'))
router.use('/crews', isCrewOrAdmin, require('./crews'))


router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
