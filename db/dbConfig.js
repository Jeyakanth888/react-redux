var mongoose = require('mongoose');
var allProductsCategory = require('../models/allProducts');
var allWatches = require('../models/watches');
var allBags = require('../models/bags');
var addCart = require('../models/addCart');
var addWishlist = require('../models/addWishlist');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/products_db')
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));
exports.allProductLists = allProductsCategory;
exports.watches = allWatches;
exports.bags = allBags;
exports.cart = addCart;
exports.wishlist = addWishlist;