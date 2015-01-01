var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mixerSchema = new Schema({
	_id: String,
	name: String
});

mixerSchema.virtual('url').get(function () {
  return '/mixers/' + this._id;
});


mongoose.model('mixer', mixerSchema);