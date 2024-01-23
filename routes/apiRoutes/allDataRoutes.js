// routes/api/allDataRoutes.js

const router = require('express').Router();
const allDataController = require('../../controllers/allDataController');
const withAuth = require('../../utils/auth'); // Import your authentication middleware

// Define your route for fetching all data
router.get('/alldata', allDataController.getAllData);

module.exports = router;

