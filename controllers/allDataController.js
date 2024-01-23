// controllers/allDataController.js
const { User, Comment, BlogPost } = require('../models');

const allDataController = {
  getAllData: async (req, res) => {
    try {
      const userData = await User.findAll();
      const commentData = await Comment.findAll();
      const blogPostData = await BlogPost.findAll();

      res.json({ userData, commentData, blogPostData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = allDataController;
