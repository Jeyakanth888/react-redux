var mongoose = require('mongoose');
var WHSchema = new mongoose.Schema({
  user_id: Number,
  product_id: Number,
  product_table:String,
  added_at:String,
});
module.exports = mongoose.model('usersWishlist', WHSchema);