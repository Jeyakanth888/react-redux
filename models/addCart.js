var mongoose = require('mongoose');
var CSchema = new mongoose.Schema({
  user_id: Number,
  product_id: Number,
  product_table:String,
  added_at:String,
});
module.exports = mongoose.model('usersCart', CSchema);