var express = require('express');
var app = require('../app');
var usersController = require('../controllers/users');
var passport = require('passport');


//configure the router
var sessionRoute = express.Router();

sessionRoute.get('/', (req, res, next) => {
    //returns info about the currently logged in user
    return res.json({ user: req.user ? req.user.toJSON() : null });
});

sessionRoute.post('/', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).send();
        req.logIn(user, err => {
            if (err) return next(err);
            return res.json({ user: user.toJSON()});
        });
    })(req, res, next);
});

sessionRoute.delete('/', (req, res, next) => {
    req.logout();
    return res.status(200).send();
});

module.exports = sessionRoute;
