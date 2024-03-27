const express = require('express');
const { createUser, getAllUser, getUserById, UpdateUser, deleteUser, login, getForm, updateForm, activationAccount, activationForm, user, generateToken, logout, forgotPassword, forgotPassLink, CreatePassword, updatePassword } = require('../controllers/login-registartion/userController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/register')
.get(getForm)

router.route('/')
.get(auth,user)


router.route('/token')
.get(activationForm)

router.route('/verify')
.get(activationAccount)

router.route('/generate')
.post(generateToken)


router.route('/login')
.get((req,res)=>{
    return res.render('login-registration/login')
})
.post(login)

router.route('/register')
.post(createUser)

router.route('/user')
.get(getAllUser)

router.route('/user/:id')
.get(getUserById)
// post because form haven't put method
.post(auth,UpdateUser)
.delete(auth,deleteUser)


router.route('/update')
.get(auth,updateForm)

router.route("/logout")
.get(auth,logout)



router.route('/forgot-password')
.get(forgotPassword)
.post(forgotPassLink)


router.route('/forgot')
.get(CreatePassword)

router.route('/create-new')
.post(updatePassword)

router.route("*")
.get((req,res)=>res.render('login-registration/404'))

module.exports = router;