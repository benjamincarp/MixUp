var express = require('express');
var app = require('../app');
var db = app.db;
var drinkModel = db.model('drink');

var controller = {
  getOne: function (id, cb) {
    return drinkModel.findOne({_id: id},function(err,drink){
      if (err) return cb(err);
      return cb(null, drink);
    });
  },

  getAll: function(cb) {
    return drinkModel.find({},function(err,drinks){
      if (err) return cb(err);

      return cb(null, drinks);
    });
  },
  
  create(data, cb) {

    //TODO: remove or improve
    //get rid of empty lines
    data.ingredients = data.ingredients.filter(line => !!line);
    
    console.log( `create with ${JSON.stringify(data)}`);
    
    var drink = new drinkModel(data);
    drink.save(function(err, newDrink) {
      if (err) return cb(err);

      return cb(null, newDrink);
    });
  },

  update(id, data, cb) {
      //get rid of empty lines
      data.ingredients = data.ingredients.filter(line => !!line);

      return this.getOne(id, (err, drink) => {
          if (err) return cb(err);

          Object.assign(drink, data);
          drink.save(function(err, newDrink) {
              if (err) return cb(err);

              return cb(null, newDrink);
          });
      });
  },
  remove(id, cb) {}
};

module.exports = controller;