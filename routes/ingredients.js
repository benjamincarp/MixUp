var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* List all ingredients */
router.get('/', function(req, res) {
  mongoose.model('ingredients').find(req.query,function(err,ingredients){
  	res.render('ingredients', { title: 'MixUp - Ingredients', ingredients: ingredients });
  	//res.send(ingredients);
  });
});

/*find an ingredient by ID */
router.get('/:ID',function(req,res){
  mongoose.model('ingredients').find({_id: req.params.ID}, function(err,ingredients){
  	res.render('ingredient', { title: "MixUp - " + ingredients[0].name, ingredient: ingredients[0] });
  	//res.send(ingredients);
  });
});

module.exports = router;