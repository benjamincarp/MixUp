var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res) {
  var searchName=req.query.name;
  /* search by name */
  if (searchName!==undefined){
  	var regex = new RegExp(searchName,"i");
  	mongoose.model('recipes').find({name: regex},function(err,recipes){
  	res.render('recipes', { title: 'MixUp - recipes', recipes: recipes,query: req.query });
  	});
  }	

  /* show all */
  else{
    mongoose.model('recipes').find(function(err,recipes){
    res.render('recipes', { title: 'MixUp - recipes', recipes: recipes });
    });
  }
});

/* find an recipe by ID */
router.get('/:ID',function(req,res){
  mongoose.model('recipes').find({_id: req.params.ID}, function(err,recipes){
  	res.render('recipe', { title: "MixUp - " + recipes[0].name, recipe: recipes[0] });
  });
});

module.exports = router;