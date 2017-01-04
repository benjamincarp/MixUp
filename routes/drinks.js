var express = require('express');
var app = require('../app');
var drinkController = require('../controllers/drinks');

module.exports = function(db){
	//configure the router
	var drinksRoute = express.Router();

	drinksRoute.get('/:drinkID', function(req, res, next){
		drinkController.getOne(req.params.drinkID, function(err,drink){
			if (err) return next(err);

			// return res.render('drink_view', drink);
			return res.json(drink);
		});
	});

	drinksRoute.get('/', function(req, res, next){
	  drinkController.getAll(function(err,drinks){
			if (err) return next(err);

			// return res.render('drinks_list', {drinks: drinks});
			return res.json(drinks);
		});
	});

	drinksRoute.post('/', function(req, res, next){
		drinkController.create(req.body, function(err, drink){
			if (err) return next(err);

			// return res.render('drinks_list', {drinks: drinks});
			return res.json(drinks);
		});
	});

	return drinksRoute;
};