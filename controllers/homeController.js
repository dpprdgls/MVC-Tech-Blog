const { BlogPost, User, Comment } = require("../models");

const homeController = {
    getHomepage: async (req, res) => {
        try {
          const blogPostsData = await BlogPost.findAll({
            include: [
              {
                model: User,
                attributes: ["username"],
              },
              {
                model: Comment,
                attributes: ["comment_body"],
              },
            ],
          });
    
          const blogPosts = blogPostsData.map((blogPost) =>
            blogPost.get({ plain: true })
          );
    
          res.render("homepage", {
            blogPosts,
            logged_in: req.session.logged_in,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    
      getBlogPost: async (req, res) => {
        try {
          const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
              {
                model: User,
                attributes: ["username"],
              },
              {
                model: Comment,
                include: [User],
              },
            ],
          });
    
          const blogPost = blogPostData.get({ plain: true });
    
          res.render("blogpost", {
            ...blogPost,
            logged_in: req.session.logged_in,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
          res.redirect('/login');
        }
      },
    
      getDashboard: async (req, res) => {
        try {
          // Check if user is logged in based on session
          if (!req.session.user_id) {
            // User is not logged in, redirect to login
            return res.redirect('/login');
          }
      
          // Fetch user data
          const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [
              {
                model: BlogPost,
                include: [User],
              },
              {
                model: Comment,
              },
            ],
          });
      
          if (!userData) {
            // Handle the case where user data is not found 
            return res.status(404).send('User not found');
          }
      
          // User is logged in, render the dashboard
          const user = userData.get({ plain: true });
          res.render("dashboard", {
            ...user,
            logged_in: true,
          });
        } catch (err) {
          console.log(err);
          // Redirect to login if there's an error (e.g., database query failure)
          res.redirect('/login');
      
        }
      },


      getCreatePost: async (req, res) => {
        try {
          if (req.session.logged_in) {
            res.render('create', {
              logged_in: req.session.logged_in,
              userId: req.session.user_id,
            });
            return;
          } else {
            res.redirect('/login');
          }
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    
      getEditPost: async (req, res) => {
        try {
          const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
              {
                model: User,
                attributes: ["username"],
              },
              {
                model: Comment,
                include: [User],
              },
            ],
          });
    
          const blogPost = blogPostData.get({ plain: true });
    
          if (req.session.logged_in) {
            res.render('edit', {
              ...blogPost,
              logged_in: req.session.logged_in,
              userId: req.session.user_id,
            });
            return;
          } else {
            res.redirect('/login');
          }
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    
      loginRedirect: (req, res) => {
        if (req.session.logged_in) {
          res.redirect('/dashboard');
          return;
        }
        res.render('login');
      },
};

module.exports = homeController;