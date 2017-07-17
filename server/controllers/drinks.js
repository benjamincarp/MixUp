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
  
  create: (data, user_id, cb) => {
    if (!user_id) {
        return cb(new Error('User is required to create drink.'));
    }
    
    data.created_by = user_id;
    
    var drink = new drinkModel(data);
    drink.save((err, newDrink) => {
      if (err) return cb(err);

      return cb(null, newDrink);
    });
  },

  update: (id, data, user_id, cb) => {
      if(!user_id) {
          return cb(new Error('User is required to create drink.'));
      }
      
      return controller.getOne(id, (err, drink) => {
          if (err) return cb(err);
          
          if(user_id.toString() !== drink.created_by.toString()) {
              return cb(new Error('Only drink creator can edit it.'));
          }

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