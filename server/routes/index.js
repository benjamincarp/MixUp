var express = require('express');
var app = require('../app');
var path = require('path');
var drinksApi = require('./drinksApi');
var usersApi = require('./usersApi');
var sessionApi = require('./sessionApi');

module.exports = (db, passport) => {
    
	//configure the router
	var router = express.Router({});

	//redirect all URLs to lower case
	app.use(require('express-uncapitalize')());

    // router.use('*', (req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "http://localhost");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    //
    //     next();
    // });

	router.use('/api/drinks', drinksApi);
    router.use('/api/users', usersApi);
    router.use('/api/session', sessionApi);

	router.get('/*',(req,res,next) => {
        const indexPath = path.resolve(__dirname, "../../client/build/index.html");
        res.sendFile(indexPath);
	});

	return router;
};
