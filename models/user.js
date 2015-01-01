var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	_id: String,
	username: String,
	password: String
});

userSchema.virtual('url').get(function () {
  return '/users/' + this._id;
});


mongoose.model('user', userSchema);