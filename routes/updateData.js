const express = require('express');
const { userData, updateUser } = require('../controllers/upateData/updateController');
const { user, getUsers } = require('../controllers/upateData/userController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();



router.route('/')
.get(auth,(req,res)=>{
    return res.render('updateData/home',{
        data:null,
        message:"",
        educationDetails:[],
        techDetails:[],
        workDetails:[],
        language:[],
        preference: null,
        referance:[],
        route:"/updateData/user"
    })
})

router.route("/users")
.get(auth,getUsers)
// router.route("/user")
// .post((req,res)=>{
//     console.log(req.body)
//     return res.send("hello")
// })

router.route('/user')
.post(auth,user)

router.route('/user/:id')
.get(auth,userData)

router.route('/update')
.post(auth,updateUser)
module.exports = router;