var mongoose = require('mongoose');

var BrandSchema = new mongoose.Schema({
  brand: String,
  id: Number
});

module.exports = mongoose.model('mobilebrands', BrandSchema);