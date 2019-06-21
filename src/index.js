
import React  from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';  
//import { createLogger } from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import App from './App';
//import {loadProducts} from './actions/getAllProducts';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);  
let store = createStoreWithMiddleware(rootReducer);

//const rootReducer = combineReducers(allReducers);
//const store = createStore(rootReducer);
store.subscribe(function () {
  const state = store.getState();
})
const addCart =   {"id":6,"category":"Watch"} ;
const addCart2 =  {"id":5,"category":"Watch"}  ;
const addCart3 =  {"id":1,"category":"Watch"}  ;
store.dispatch({type:"GET_ALL_PRODUCTS",payload:""});
store.dispatch({ type: "ADD_CART", payload:addCart }) ;
store.dispatch({ type: "ADD_CART", payload:addCart3 }) ;
store.dispatch({ type: "ADD_WISHLIST", payload:addCart2 }) ;
//store.dispatch({type:"LOAD_ALL_PRODUCTS",payload:loadProducts});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)




