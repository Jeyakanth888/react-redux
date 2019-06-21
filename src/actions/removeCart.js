import { REMOVE_CART } from './cartactions';
export default function removeFromCart(receiveObj) {  
    return dispatch => {
      dispatch(removeFromCartAsync(receiveObj));
    }
  }
  function removeFromCartAsync(receiveObj){  
    return {
      type: REMOVE_CART,
      payload: receiveObj
    };
  }