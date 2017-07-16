var express = require('express');
var app = require('../app');
var db = app.db;
var userModel = db.model('user');

var controller = {
  getOne: (id, cb) => {
    return userModel.findOne({_id: id},(err,user) => {
      if (err) return cb(err);
      return cb(null, user.toJSON());
    });
  },

  getAll: (cb) => {
    return userModel.find({},(err,users) => {
      if (err) return cb(err);

      return cb(null, users.map( user => user.toJSON() ));
    });
  }
};

module.exports = controller;