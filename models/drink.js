var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drinkSchema = new Schema({
	_id: String,
	name: String
});

drinkSchema.virtual('url').get(function () {
  return '/drinks/' + this._id;
});

mongoose.model('drink', drinkSchema);