const router = require('express').Router();
const { Comment, User } = require('../db/models');

router.get('/:id', async (req, res, next) => {
  try {
    console.log('in comments route')
    const potholeComments = await Comment.findAll({
      where: { potholeId: req.params.id },
      include: [User],
    });
    res.json(potholeComments);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const comment = req.body;
    let createdComment = await Comment.create(comment);
    let commentWithUser = await Comment.findById(createdComment.id, {
      include: [User],
    });
    res.json(commentWithUser); // here you need to get that comment and include the user!!
  } catch (error) {
    next(error);
  }
});

module.exports = router;
