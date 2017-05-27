var express = require('express');
var app = require('../app');
var drinkController = require('../controllers/drinks');

module.exports = function(db){
	//configure the router
	var drinksRoute = express.Router();

	drinksRoute.get('/create', function(req, res, next){
		return res.render('drink_view', {isNew: true});
	});

	
	drinksRoute.get('/:drinkID', function(req, res, next){
		drinkController.getOne(req.params.drinkID, function(err,drink){
			if (err) return next(err);

			return res.render('drink_view', drink);
		});
	});

	drinksRoute.get('/', function(req, res, next){
		drinkController.getAll(function(err,drinks){
			if (err) return next(err);

			return res.render('drinks', {drinks: drinks});
		});
	});

	drinksRoute.post('/', function(req, res, next){
		drinkController.create(req.body, function(err, drink){
			if (err) return next(err);

			return res.redirect(drink.url);
		});
	});

	return drinksRoute;
};