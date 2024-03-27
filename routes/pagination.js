const express = require('express');
const { getAllUser, getUserOrderBy, getUserOrderByValue } = require('../controllers/pagination/userController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();



router.get('/',auth,async(req,res)=>{
    return res.render('pagination')
})


router.get('/user',auth,getAllUser)

router.get('/users',auth,getUserOrderBy)
router.get('/data',auth,getUserOrderByValue)







module.exports = router;