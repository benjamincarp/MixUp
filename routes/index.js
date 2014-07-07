var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MixUp' });
});

router.get('/params/:id',function(req, res){
	res.send(req.params.id,200);
});

router.get('/query',function(req, res){
	res.send(req.query,200);
});

module.exports = router;
