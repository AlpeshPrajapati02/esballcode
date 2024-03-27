const express = require('express');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/posts",auth,(req,res)=>{
    return res.render('spa/home')
})

router.get("/postDetails/:id",auth,(req,res)=>{
    return res.render('spa/post')
})


router.all("*",auth,(req,res)=>{
    res.send("Helllo")
})

module.exports = router;