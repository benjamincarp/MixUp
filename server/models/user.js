var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: 		{ type: String, required: true, lowercase: true, trim: true },
	password: 		{ type: String, required: true },
	first_name: 	{ type: String, required: false, trim: true },
	last_name: 		{ type: String, required: false, trim: true },
	create_date:	{ type: Date, 	required: true, default: Date.now() } 
});

userSchema.virtual('url').get(function () {
  return '/api/users/' + this._id;
});

userSchema.virtual('name').get(function () {
    if (this.first_name && this.last_name) return `${this.first_name} ${this.last_name}`;
	if (this.first_name) return this.first_name;
	if (this.last_name) return this.last_name;
	return this.username;
});

userSchema.set('toJSON', {virtuals: true});

userSchema.options.toJSON.transform = (doc, ret, options) => {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    
    return ret;
};


mongoose.model('user', userSchema);