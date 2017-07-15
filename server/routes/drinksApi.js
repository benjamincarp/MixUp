var express = require('express');
var app = require('../app');
var drinkController = require('../controllers/drinks');


//configure the router
var drinksRoute = express.Router();

drinksRoute.get('/:drinkID', function(req, res, next){
    drinkController.getOne(req.params.drinkID, function(err,drink){
        if (err) return next(err);

        return res.json(drink.toJSON());
    });
});

drinksRoute.get('/', function(req, res, next){
    drinkController.getAll(function(err,drinks){
        if (err) return next(err);

        return res.json(drinks.map( drink => drink.toJSON() ));
    });
});

drinksRoute.post('/', function(req, res, next){
    drinkController.create(req.body, function(err, drink){
        if (err) return next(err);

        return res.json(drink.toJSON());
    });
});


drinksRoute.put('/:drinkID', function(req, res, next){
    drinkController.update(req.params.drinkID, req.body, function(err,drink){
        if (err) return next(err);

        return res.json(drink.toJSON());
    });
});

module.exports = drinksRoute;
