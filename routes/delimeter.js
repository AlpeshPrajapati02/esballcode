const express = require('express');
const { getUser } = require('../controllers/delimeterSearch/userController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();


router.route('/')
.get(auth,getUser)
.post(auth,getUser)


module.exports = router;