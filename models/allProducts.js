var mongoose = require('mongoose');
var PSchema = new mongoose.Schema({
    cid: Number,
    cname: String
  
});
module.exports = mongoose.model('productlists', PSchema);