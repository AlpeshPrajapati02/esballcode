const express = require('express')
const router = express.Router();
const path = require('path')
const {auth} = require('../middlewares/authMiddleware')

router.get('/tic-tac-toe',auth,(req,res)=>{
    return res.render('tic-tac-toe/index')
})

router.get('/kukukube',auth,(req,res)=>{
    return res.render('task3-kukukube/index')
})

router.get('/addrowcol',auth,(req,res)=>{
    return res.render('task2-add-row-col/index')
})

router.get('/allevents',auth,(req,res)=>{
    return res.render('jsevents-form/index')
})

module.exports = router;