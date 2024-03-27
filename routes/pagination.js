const express = require('express');
const { getAllUser, getUserOrderBy, getUserOrderByValue } = require('../controllers/pagination/userController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();



router.get('/',auth,getUserOrderByValue)








module.exports = router;