//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const findOrCreate = require('mongoose-findorcreate');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "cats",

}));
app.use(passport.initialize());
app.use(passport.session());
//--------------------------------------passportjs starts here-------------------------------
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = mongoose.model('User', userSchema);
passport.use(User.createStrategy());




passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
//const dotenv=require('dotenv').config()
//const md5 = require('md5');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;
//const encrypt=require('mongoose-encryption');
//console.log(process.env.apikey);
//var secret =process.env.SECRET;
//userSchema.plugin(encrypt, { secret: secret ,encryptedFields: ['password']});
//console.log(md5(string to be encrypted))
//bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
// Store hash in your password DB.
//});
//bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
// result == true
//});

passport.use(new GoogleStrategy({
    clientID: '1095736906388-irh93s8ij0h76o4afsodh2o4kgi3j3tg.apps.googleusercontent.com',
    clientSecret: 'omI6fUh7xwCsTmwF3-p3Hyad',
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"

  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));

app.get('/auth/google/secrets',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect('/secrets');
  });

// -------------------------passport section ends here!----------------------------------
app.get('/home', function(req, res) {
  res.render('home');
});
app.get('/login', function(req, res) {
  res.render('login');
});
app.get('/register', function(req, res) {
  res.render('register');
});
app.get('/secrets', function(req, res) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated() === false) res.redirect('/login');
  else {
    res.render('secrets');
  }
});
app.post("/register", function(req, res) {

  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });

});

app.post("/login", function(req, res) {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });

});
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});
app.listen(3000, function() {
  console.log('Service Started Successfully!');
});
