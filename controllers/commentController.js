const { Comment, BlogPost, User } = require('../models');

const commentController = {
    createComment: async (req, res) => {
        try {
            console.log("That's no moon!");
            const comment = await Comment.create({
                comment_body: req.body.comment_body,
                blogPost_id: req.body.blogPost_id,
                user_id: req.session.user_id || req.body.user_id,
            });
            res.status(200).json(comment);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    viewAllComments: async (req, res) => {
        try {
            const commentData = await Comment.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["username"],
                    },
                    {
                        model: BlogPost,
                        attributes: ["id"],
                    },
                ],
            });
            res.status(200).json(commentData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    editComment: async (req, res) => {
        try {
            const updatedComment = await Comment.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            if (!updatedComment[0]) {
                res.status(500).json({ message: "No matching comment found!" });
                return;
            }
            console.log('Comment updated!');
            res.status(200).json(updatedComment);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    deleteComment: async (req, res) => {
        try {
            const deletedComment = await Comment.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (!deletedComment) {
                res.status(500).json({ message: "No matching comment found!" });
                return;
            }
            console.log('Comment deleted!');
            res.status(200).json(deletedComment);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = commentController;