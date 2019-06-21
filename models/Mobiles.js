var mongoose = require('mongoose');

var MobileSchema = new mongoose.Schema({
  type: String,
  price: String,
  description:String,
  brandId:Number,
  colors:[],
  images:[]
});

module.exports = mongoose.model('mobilelists', MobileSchema);