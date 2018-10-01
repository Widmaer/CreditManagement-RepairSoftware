const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
var User = require('../models/User')
passport.serializeUser(function(user, cb) {
  cb(null,user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
passport.use(new Strategy({
  usernameField:'email',
  passwordfield:'password'
},
function(username, password, done) {
    User.findOne({ email: username }, async function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      var isUser = await bcrypt.compare(password,user.password)
      if (!isUser) { return done(null, false); }
      return done(null, user);
    });
  }
));
