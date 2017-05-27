var express = require('express');
var app = require('../app');
var path = require('path');

module.exports = function(db, passport){

	var drinks = require('./drinks')(db);
	var drinksApi = require('./drinksApi')(db);

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
		res.render('login', {hideLogin: true});
	});
	  /* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
	    successRedirect: '/',
	    failureRedirect: '/login',
	    failureFlash : true 
	}));
	 
	  /* GET Registration Page */
	router.get('/register', function(req, res){	
		res.render('register', {hideLogin: true});
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

	router.use('/api/drinks', drinksApi);

	router.use('/drinks', drinks);

	router.get('/',function(req,res,next){
        const indexPath = path.resolve(__dirname, "../../client/build/index.html");
        res.sendFile(indexPath);
	});

	return router;
};
// module.exports = router;
