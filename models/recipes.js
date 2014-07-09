var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({name: String});

mongoose.model('recipes', recipeSchema);