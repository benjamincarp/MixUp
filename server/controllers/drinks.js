var app = require('../app');
var db = app.db;
var drinkModel = db.model('drink');

var controller = {
  getOne: (id, cb) => {
    return drinkModel.findOne({_id: id},(err,drink) => {
      if (err) return cb(err);
      return cb(null, drink);
    });
  },

  getAll: (cb) => {
    return drinkModel.find({},(err,drinks) => {
      if (err) return cb(err);

      return cb(null, drinks);
    });
  },
  
  create: (data, cb) => {
    var drink = new drinkModel(data);
    drink.save((err, newDrink) => {
      if (err) return cb(err);

      return cb(null, newDrink);
    });
  },

  update: (id, data, cb) => {
      return this.getOne(id, (err, drink) => {
          if (err) return cb(err);

          Object.assign(drink, data);
          drink.save((err, newDrink) => {
              if (err) return cb(err);

              return cb(null, newDrink);
          });
      });
  },
  remove: (id, cb) => {}
};

module.exports = controller;