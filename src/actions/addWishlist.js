import { ADD_WISHLIST } from './cartactions';
export default function addToWishlist(receiveObj) {  
    return dispatch => {
      dispatch(addToWishlistAsync(receiveObj));
    }
  }
  function addToWishlistAsync(receiveObj){  
    return {
      type: ADD_WISHLIST,
      payload: receiveObj
    };
  }