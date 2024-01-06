const router = require("express").Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');

//middeware
router.use('/users', userRoutes);
router.use('/blogPost', blogRoutes);
router.use('/comment', commentRoutes);

module.exports = router;