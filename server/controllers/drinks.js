var express = require('express');
var app = require('../app');
var db = app.db;
var drinkModel = db.model('drink');

var controller = {
  getOne: function (id, cb) {
    return drinkModel.findOne({_id: id},function(err,drink){
      if (err) return cb(err);
      return cb(null, drink.toJSON());
    });
  },

  getAll: function(cb) {
    return drinkModel.find({},function(err,drinks){
      if (err) return cb(err);

      //use the toObject to get all the virtuals in there	
      for(var i=0; i<drinks.length; i++){
        drinks[i]=drinks[i].toObject({virtuals: true});
      }

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

      return cb(null, newDrink.toJSON());
    });
  },

  update(id, data, cb) {},
  remove(id, cb) {}
};

module.exports = controller;