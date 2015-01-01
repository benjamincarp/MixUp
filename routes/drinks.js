var express = require('express');
var app = require('../app');

module.exports = function(db){
	//configure the router
	var drinksRoute = express.Router({
		caseSensitive: true,        //  /foo != /FOO
		strict: true				//  /foo != /foo/
	});

	drinksRoute.get('/:drinkID',function(req, res, next){
	   db.model('drink').findOne({_id: req.params.drinkID},function(err,drink){
	  		if (err) return next(err);

	  		return res.render('drink_view', drink);
	  	});
	});

	drinksRoute.get('/',function(req, res, next){
	  	db.model('drink').find({},function(err,drinks){
	  		if (err) return next(err);

	  		//use the toObject to get all the virtuals in there	
	  		for(var i=0; i<drinks.length; i++){
	  			drinks[i]=drinks[i].toObject({virtuals: true});
	  		}

	  		return res.render('drinks_list', {drinks: drinks});
	  	});
	});

	return drinksRoute;
};