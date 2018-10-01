var express =require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var passport = require('passport')
var app = express()

mongoose.connect('mongodb://localhost:27017/makavali');
var port = process.env.PORT||3000;
var router = require('./routers/userRoute')

require('./configuration/passportSetup')

app.set('view engine','ejs')
app.set('views','./views')

app.use(express.static('public'))
app.use('/clients',express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieParser())
app.use(session({
  secret:'awesomeprivatekey',
  saveUninitialized:false,
  resave:false,
  cookie:{
    secure:false,
  }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(router)



app.listen(port,function(){
  console.log(`App listening on port ${port}`);
})
