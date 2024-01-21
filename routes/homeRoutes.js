const router = require("express").Router();
const homeController = require('../controllers/homeController');
const withAuth = require("../utils/auth");

router.get("/", homeController.getHomepage);

router.get('/blogpost/:id', withAuth, homeController.getBlogPost);

router.get('/dashboard', withAuth, homeController.getDashboard);

router.get('/create', homeController.getCreatePost);

router.get('/create/:id', homeController.getEditPost);

router.all('/login', homeController.loginRedirect);

module.exports = router;