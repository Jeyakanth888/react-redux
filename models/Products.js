var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  item: String,
  models: []
});

module.exports = mongoose.model('mobileproducts', ProductSchema);
