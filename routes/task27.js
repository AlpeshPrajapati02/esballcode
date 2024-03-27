const express = require('express');
const { getAllUser, getResult, getResultById, getResults, getResultQ } = require('../controllers/task-27-02/userController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

    
// attendance route
router.get('/user',auth,getAllUser)

// result route for all users
router.get('/result',auth,getResult)

// result router
router.get('/result/:id',auth,getResultById)



// other codes route
router.get('/',auth,getResults)

router.get('/single',auth,getResultQ)









module.exports = router;