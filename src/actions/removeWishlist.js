import { REMOVE_WISHLIST } from './cartactions';
export default function removeFromWishlist(receiveObj) {  
    return dispatch => {
      dispatch(removeFromWishlistAsync(receiveObj));
    }
  }
  function removeFromWishlistAsync(receiveObj){  
    return {
      type: REMOVE_WISHLIST,
      payload: receiveObj
    };
  }