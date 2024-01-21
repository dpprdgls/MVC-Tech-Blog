const router = require("express").Router();
const blogPostController = require('../../controllers/blogPostController');
const withAuth = require('../../utils/auth');

////////////////////////////////////////////New Post/////////////////////////////////////////////
router.post('/', withAuth, blogPostController.createPost);

////////////////////////////////////////////Edit Post/////////////////////////////////////////////
router.put('/:id', withAuth, blogPostController.editPost);

///////////////////////////////////////Delete Post/////////////////////////////////////////////
router.delete('/:id', withAuth, blogPostController.deletePost);

module.exports = router;