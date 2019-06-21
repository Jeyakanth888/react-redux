import * as types from '../actions/cartactions';  
import initialState from './initialState';

export default function productReducer(state = initialState.products, action) { 
  switch(action.type) {
    case types.LOAD_ALL_PRODUCTS:
      return action.payload
    default: 
      return state;
  }
}