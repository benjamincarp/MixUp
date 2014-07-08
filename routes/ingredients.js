var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res) {
  var searchName=req.query.name;
  //search by name
  if (searchName!==undefined){
  	var regex = new RegExp(searchName,"i");
  	mongoose.model('ingredients').find({name: regex},function(err,ingredients){
  	res.render('ingredients', { title: 'MixUp - Ingredients', ingredients: ingredients,query: req.query });
  	});
  }	

  //show all
  else{
    mongoose.model('ingredients').find(function(err,ingredients){
    res.render('ingredients', { title: 'MixUp - Ingredients', ingredients: ingredients });
    });
  }
});

/*find an ingredient by ID */
router.get('/:ID',function(req,res){
  mongoose.model('ingredients').find({_id: req.params.ID}, function(err,ingredients){
  	res.render('ingredient', { title: "MixUp - " + ingredients[0].name, ingredient: ingredients[0] });
  });
});

module.exports = router;