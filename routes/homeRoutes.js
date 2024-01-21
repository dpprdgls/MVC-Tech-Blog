const router = require("express").Router();
const withAuth = require("../utils/auth");
const { BlogPost, User, Comment } = require("../models");
const apiRoutes = require('./apiRoutes');

router.get("/", async (req, res) => {
    console.log('homepage route hit');
    try {
        //get all blogposts and join with user and comment data
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

        const blogPosts = blogPostsData.map((blogPost) => blogPost.get({ plain: true }));

        res.render("homepage", {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// get single blogpost and render the blogpost page

router.get('/blogpost/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
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
});


//route to allow access to dashboard page 
//withAuth middleware prevents access to dashboard page if not logged in

router.get('/dashboard', withAuth, async (req, res) => {
    try {
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
        
        const user = userData.get({ plain: true });
        console.log(user);

        res.render("dashboard", {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        // res.redirect('/login');
    }
});

////////////////////////////////////////////New Post/////////////////////////////////////////////

router.get('/create', async (req, res) => {
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
    });

////////////////////////////////////////////Edit Post/////////////////////////////////////////////

router.get('/create/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            //join user data and comment data with blog post data
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
        console.log(blogPost);

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
});



router.all('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;