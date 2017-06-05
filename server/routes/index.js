var express = require('express');
var app = require('../app');
var path = require('path');
var drinksApi = require('./drinksApi');
var usersApi = require('./usersApi');
var sessionApi = require('./sessionApi');

module.exports = function(db, passport){
    
	//configure the router
	var router = express.Router({
		caseSensitive: true,        //  /foo != /FOO
		strict: true				//  /foo != /foo/
	});

	//redirect all URLs to lower case
	app.use(require('express-uncapitalize')());

	router.use('/api/drinks', drinksApi);
    router.use('/api/users', usersApi);
    router.use('/api/session', sessionApi);

	router.get('/*',function(req,res,next){
        const indexPath = path.resolve(__dirname, "../../client/build/index.html");
        res.sendFile(indexPath);
	});

	return router;
};
