
import { LOAD_ALL_PRODUCTS,REQUEST_PRODUCTS } from './cartactions';
import allProductsApi from '../api/allProductsApi';
import axios from 'axios';
import fetch from 'cross-fetch' ;
export function loadProducts() {
   return function(dispatch) {
      return allProductsApi.getAllProducts().then(products => {
          return products;
     //  return dispatch(loadProductsSuccess(products));
      }).catch(error => {
        throw(error);
      });
    };
  
 
  /*return  function(dispatch) {
  return  fetch('/api/allProducts')
        .then(function (response) {
          if (response.status !== 200) throw Error("body.message");
          if (response.data.status === "OK") {
            const responsedata = response.data.data;
           // return responsedata;
           return dispatch(loadProductsSuccess(responsedata));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
*/
  /*  return dispatch => {
        //dispatch({ type: REQUEST_PRODUCTS });
        return  fetch('/api/allProducts')
          .then(res => res.json())
          .then(products => {
            dispatch({ type: LOAD_ALL_PRODUCTS, payload: products });
            return products;
          });
      }*/
    }
  function loadProductsSuccess(products){  
    return {
      type: LOAD_ALL_PRODUCTS,
      payload: products
    };
  }