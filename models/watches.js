var mongoose = require('mongoose');

var WSchema = new mongoose.Schema({
  category: String,
  productName: String,
  style:String,
  price:Number,
  offerPercentage:Number,
  description:String,
  specification:String,
  productId:Number
});

module.exports = mongoose.model('watches', WSchema);
