const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const cupcakeSchema = new Schema({
  name: String,
  description: String,
  ingredients: String,
  imageUrl: { type: String, required: true },
  flavorlist: {
    type: Schema.Types.ObjectId,
    ref: 'Flavorlist'
  }
});
 
const Cupcake = mongoose.model('Cupcake', cupcakeSchema);
 
module.exports = Cupcake;