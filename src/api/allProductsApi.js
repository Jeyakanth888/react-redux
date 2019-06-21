import React, { Component } from 'react';
import axios from 'axios';
import fetch from 'cross-fetch' ;
import * as productActions from '../actions/productactions';



/*class allProductsApi extends Component{  
     getAllProducts = ()=> {
      return  axios.get('/api/allProducts')
        .then(function (response) {
          if (response.status !== 200) throw Error("body.message");
          if (response.data.status === "OK") {
            const responsedata = response.data.data;
            return responsedata;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
}
}
export default allProductsApi;  */
//class getAllProductsApiCall extends Component{
const getAllProductsApiCall = {
    getAllProducts() {
      fetch('/api/allProducts')
      .then(response =>  response.text())
      .then(respjson => {                    // 2
        const respData = JSON.parse(respjson);
        if (respData.status === "OK") {
            const responsedata = respData.data;
    return responsedata;
          //  this.props.loadProducts(responsedata);
        // return   productActions.getAllProductSuccess(responsedata);
            //return responsedata;
          }
        //if (response.status >= 200 && response.status < 300) {
       // } else {
         // const error = new Error(response.statusText);
          //error.response = response;
         // productActions.loginError();
        //  throw error;
       // }
      })
      .catch(error => { console.log('request failed', error); });
    }
  };
  
  export default getAllProductsApiCall;
  