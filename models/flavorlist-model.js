const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user-model');
 
const flavorlistSchema = new Schema({
  title: String,
  description: String,
  cupcakes: [{ type: Schema.Types.ObjectId, ref: 'Cupcake' }],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  imageUrl: { type: String, required: true },
});
 
const Flavorlist = mongoose.model('Flavorlist', flavorlistSchema);
 
module.exports = Flavorlist;