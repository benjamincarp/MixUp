var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ingredientLine = require('./ingredientLine');

var drinkSchema = new Schema({
	name: 				{ type: String, required: true },
	ingredients: 	[ ingredientLine ],
	instructions: { type: String, required: true },
	create_date:	{ type: Date, 	required: true, default: Date.now() },
	created_by: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false} 
});

drinkSchema.virtual('url').get(function () {
  return '/drinks/' + this._id;
});

mongoose.model('drink', drinkSchema);