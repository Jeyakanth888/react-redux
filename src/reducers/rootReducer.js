import { combineReducers } from 'redux';
import Immutable from 'immutable';
//import initialState from './initialState';
//import products from './productReducer';
//import allProductsApi from '../api/allProductsApi';
const initialState = new Immutable.Map({ products: [] }).asMutable();

const userAdded = { "cartLists": [], "wishLists": [] }
const productReducer = function (state = {}, action) {
  switch (action.type) {
    /*case "GET_ALL_PRODUCTS":
    allProductsApi.getAllProducts(); 
     break;*/
    case "LOAD_ALL_PRODUCTS":
      state = action.payload.products;
      break; 
  }
  return state;
}
const wishlistsReducer = function (state = {}, action) {
  const addedWishLists = userAdded.wishLists;
  switch (action.type) {
    case "ADD_WISHLIST":
      if (addedWishLists.length > 0) {
        const findIndex = addedWishLists.map(function (e) { return e.id; }).indexOf(action.payload.id);
        if (findIndex === -1) {
          addedWishLists.push(action.payload);
          state = addedWishLists;
        }
      } else {
        addedWishLists.push(action.payload);
        state = addedWishLists;
      }
      break;
    case "REMOVE_WISHLIST":
      const findIndex = addedWishLists.map(function (lists) {
        return lists.id;
      }).indexOf(action.payload.id);
      addedWishLists.splice(findIndex, 1);
      break;
  }
  return state;
}
const cartReducer = function (state = {}, action) {
  const addedCartLists = userAdded.cartLists;

  switch (action.type) {
    case "ADD_CART":
      //console.log("adding .."+action.payload);
      // let  findIndex = userAdded["cartLists"].indexOf(action.payload);
      // if (findIndex === -1)
      //  console.log(addedCartLists.length);
      if (addedCartLists.length > 0) {
        const findIndex = addedCartLists.map(function (e) {
          return e.id;
        }).indexOf(action.payload.id);
        if (findIndex === -1) {
          addedCartLists.push(action.payload);
          state = addedCartLists;
        }
      } else {
        addedCartLists.push(action.payload);
        state = addedCartLists;
      }
      break;
    case "REMOVE_CART":
      const findIndex = addedCartLists.map(function (lists) {
        return lists.id;
      }).indexOf(action.payload.id);
      addedCartLists.splice(findIndex, 1);
      break;
  }
  return state;
}
const allReducers = {
  productsInfo: productReducer,
  userShoppingCart: cartReducer,
  userWishLists: wishlistsReducer
}
const rootReducer = combineReducers(allReducers);

export default rootReducer;  