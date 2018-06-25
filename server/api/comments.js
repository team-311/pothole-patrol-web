const router = require('express').Router();
const { Comment } = require('../db/models');

router.post('/', async (req, res, next) => {
  const comment = req.body;
  let createdComment = await Comment.create(comment);
  res.json(createdComment);
});

module.exports = router;
