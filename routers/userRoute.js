var express = require('express')
var router = express.Router()
var controller = require('../controllers/userController')
var passport = require('passport')

router.get('/',controller.index)
router.get('/clients',controller.clients)
router.get('/login',function(req,res){
  res.render('login')
})
router.get('/register',function(req,res){
  res.render('register')
})
router.post('/addClient',controller.addClient)
router.post('/register',controller.register)
router.post('/login',passport.authenticate('local'),controller.login)


module.exports = router
