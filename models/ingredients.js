var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = new Schema({name: String});

mongoose.model('ingredients', ingredientSchema);