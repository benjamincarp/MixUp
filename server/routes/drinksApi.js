var express = require('express');
var app = require('../app');
var drinkController = require('../controllers/drinks');


//configure the router
var drinksRoute = express.Router();

drinksRoute.use('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

drinksRoute.get('/:drinkID', function(req, res, next){
    drinkController.getOne(req.params.drinkID, function(err,drink){
        if (err) return next(err);

        return res.json(drink);
    });
});

drinksRoute.get('/', function(req, res, next){
    drinkController.getAll(function(err,drinks){
        if (err) return next(err);

        return res.json(drinks);
    });
});

drinksRoute.post('/', function(req, res, next){
    drinkController.create(req.body, function(err, drink){
        if (err) return next(err);

        return res.json(drink);
    });
});

module.exports = drinksRoute;
