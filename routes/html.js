const express = require('express')
const router = express.Router();

router.route('/hirex')
.get((req,res)=>{
   return res.render('practical3/index')
})

router.route('/ownhoster')
.get((req,res)=>{
   return res.render('task2/index')
})

router.route('/ahya')
.get((req,res)=>{
   return res.render('task1/index')
})



module.exports = router;