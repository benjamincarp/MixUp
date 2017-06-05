var express = require('express');
var app = require('../app');
var usersController = require('../controllers/users');
var passport = require('passport');


//configure the router
var usersRoute = express.Router();

usersRoute.use('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

usersRoute.post('/', (req, res, next) =>{
    passport.authenticate('signup', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).send();
        req.logIn(user, err => {
            if (err) return next(err);
            return res.json(user.toJSON());
        });
    })(req, res, next);
});

usersRoute.get('/:userId', (req, res, next) => {
    usersController.getOne(req.params.userId, (err, user) => {
       if (err) return next(err);
       
       return res.json(user);
    });
});

module.exports = usersRoute;