var express = require('express');
var app = require('../app');

module.exports = function(db, passport){

	var drinks = require('./drinks')(db);
	var mixers = require('./mixers')(db);

	//configure the router
	var router = express.Router({
		caseSensitive: true,        //  /foo != /FOO
		strict: true				//  /foo != /foo/
	});

	//redirect all URLs to lower case
	app.use(require('express-uncapitalize')());

	//Set up the routes
	  /* Handle Login GET */
	router.get('/login', function(req, res){
		res.render('login');
	});
	  /* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
	    successRedirect: '/',
	    failureRedirect: '/login',
	    failureFlash : true 
	}));
	 
	  /* GET Registration Page */
	router.get('/register', function(req, res){	
		res.render('register');
	});
	 
	  /* Handle Registration POST */
	router.post('/register', passport.authenticate('signup', {
	    successRedirect: '/',
	    failureRedirect: '/register',
	    failureFlash : true 
	}));

	/* Handle Logout */
	router.get('/signout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});

	router.use('/drinks',drinks);
	router.use('/mixers',mixers);

	router.get('/',function(req,res,next){
		// res.status(200).send("Default Route");

		res.render('index');
	});

	return router;
};
// module.exports = router;