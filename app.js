var path = require('path');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var expressSession = require('express-session');
var bCrypt = require('bcrypt-nodejs');
var serveStatic = require('serve-static');
var flash = require('connect-flash');
const favicon = require('serve-favicon');

var express = require('express');
var app = express();

// Configuring Passport
app.use(expressSession({
	secret: 'SsshhhItsASecret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//setup the database connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('localhost', 'mixup', 27017);
app.db = db;

var drink=require(__dirname + '/models/drink.js');
var user=require(__dirname + '/models/user.js');

var User = db.model('user');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// passport/login.js
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username.toLowerCase() }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
                req.flash('message', 'User Not found.'));                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({'username':username},function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false, 
             req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.first_name = req.body.first_name;
          newUser.last_name = req.body.last_name;
 
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    };
     
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
);

// Generates hash using bCrypt
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

//needed to populate req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//middleware to populate base locals for the view templates
app.use(function(req, res, next){
  res.locals.User = req.user;
  res.locals.message = req.flash('message');

  return next();
})

//export the app so other files can require it
module.exports = app;

// view engine setup
app.enable('view cache');
app.engine('.hbs', exphbs({
	extname: '.hbs',
	defaultLayout: 'main',
	compilerOptions: {
		preventIndent: true
	},
	helpers: {
		toJSON(object) {
			return JSON.stringify(object);
		}
  }
}));
app.set('view engine', '.hbs');

//serve up static files from the public folder
app.use(express.static('public'));

// app.use(favicon(`${__dirname}/public/assets/favicon.png`));

//configure express
app.set('title','MixUp');

//use the router for all valid requests
var router = require('./routes/index')(db,passport);
app.use('/',router);

//404 handling
app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!');
});

//Generic error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//start the server
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Grab a drink at port %s', port);

});