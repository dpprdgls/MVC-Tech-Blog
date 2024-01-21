const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////////New Post/////////////////////////////////////////////

router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try { 
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlogPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


////////////////////////////////////////////Edit Post/////////////////////////////////////////////
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const blogPostData = await BlogPost.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!blogPostData) {
            res.status(404).json({ message: "Matching Blog Post Not Found!" });
            return;
        }

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

///////////////////////////////////////Delete Post/////////////////////////////////////////////

router.delete('/:id', withAuth, async (req, res) => {
    console.log(req.params.id);
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!blogPostData) {
            res.status(404).json({ message: "Matching Blog Post Not Found!" });
            return;
        }

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;


