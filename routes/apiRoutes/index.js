const router = require("express").Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');
const allDataRotues = require('./allDataRoutes');


//middeware
router.use('/users', userRoutes);
router.use('/blogPost', blogRoutes);
router.use('/comment', commentRoutes);
router.use('/alldata', allDataRotues);

module.exports = router;