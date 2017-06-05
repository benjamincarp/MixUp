var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drinkSchema = new Schema({
    name: 			{ type: String, required: true },
	ingredients: 	[ { _id: false, type: String, required: true } ],
	instructions:   { type: String, required: false },
	create_date:	{ type: Date, 	required: true, default: Date.now() },
	created_by: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false} 
});

drinkSchema.virtual('url').get(function () {
  return '/api/drinks/' + this._id;
});

drinkSchema.set('toJSON', {virtuals: true});

drinkSchema.options.toJSON.transform = (doc, ret, options) => {
    delete ret._id;
    delete ret.__v;

    return ret;
};

mongoose.model('drink', drinkSchema);