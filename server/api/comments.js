const router = require('express').Router();
const { Comment, User } = require('../db/models');

router.get('/:id', async (req, res, next) => {
  const potholeComments = await Comment.findById(req.params.id, {
    include: [User],
  });
  res.json(potholeComments);
});

router.post('/', async (req, res, next) => {
  const comment = req.body;
  let createdComment = await Comment.create(comment);
  res.json(createdComment);
});

module.exports = router;
