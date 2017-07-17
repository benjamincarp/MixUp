var express = require('express');
var app = require('../app');
var drinkController = require('../controllers/drinks');


//configure the router
var drinksRoute = express.Router();

drinksRoute.get('/:drinkID', (req, res, next) => {
    drinkController.getOne(req.params.drinkID, (err,drink) => {
        if (err) return next(err);

        return res.json(drink.toJSON());
    });
});

drinksRoute.get('/', (req, res, next) => {
    drinkController.getAll((err,drinks) => {
        if (err) return next(err);

        return res.json(drinks.map( drink => drink.toJSON() ));
    });
});

drinksRoute.post('/', (req, res, next) => {
    if (!req.user) {
        return res.sendStatus(401);
    }
    drinkController.create(req.body, req.user._id, (err, drink) => {
        if (err) return next(err);

        return res.json(drink.toJSON());
    });
});


drinksRoute.put('/:drinkID', (req, res, next) => {
    if (!req.user) {
        return res.sendStatus(401);
    }
    
    drinkController.update(req.params.drinkID, req.body, req.user._id, (err,drink) => {
        if (err) return next(err);

        return res.json(drink.toJSON());
    });
});

module.exports = drinksRoute;
