const express = require('express');
const { getForm, getData, user } = require('../controllers/jobappcombo/userController');
const { userData, updateUser } = require('../controllers/jobappcombo/updateController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();



router.route('/')
.get(auth,getForm)

router.route('/users')
.get(auth,getData)

router.route('/edit/:id')
.get(auth,getForm)

router.route('/user/edit/:id')
.get(auth,userData)

router.route('/user')
.post(auth,user)

router.route('/update/:id')
.post(auth,updateUser)

module.exports = router;