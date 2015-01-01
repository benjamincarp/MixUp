var express = require('express');
var app = require('../app');

module.exports = function(db){
	//configure the router
	var mixers = express.Router({
		caseSensitive: true,        //  /foo != /FOO
		strict: true				//  /foo != /foo/
	});

	mixers.post('/:mixerID',function(req, res, next){
		console.log(req.body);
		return res.redirect('/mixers');
	});

	mixers.get('/:mixerID',function(req, res, next){
		console.log("get mixer " + req.params.mixerID);

		db.model('mixer').findOne({_id: req.params.mixerID},function(err,mixer){
	  		if (err) return next(err);

	  		return res.render('mixer_view', mixer);
	  	});
	});

	mixers.get('/',function(req, res, next){
	  	db.model('mixer').find({},function(err,mixers){
	  		if (err) return next(err);


	  		//use the toObject to get all the virtuals in there	
	  		for(var i=0; i<mixers.length; i++){
	  			mixers[i]=mixers[i].toObject({virtuals: true});
	  		}

	  		return res.render('mixers_list', {mixers: mixers});
	  	});
	});

	return mixers;
};