import { ADD_CART } from './cartactions';
export default function addToCart(receiveObj) {  
    return dispatch => {
      dispatch(addToCartAsync(receiveObj));
    }
  }
  function addToCartAsync(receiveObj){  
    return {
      type: ADD_CART,
      payload: receiveObj
    };
  }