import { LOAD_ALL_PRODUCTS,API_FAILED } from './cartactions';
export function loginError(error) {
    return dispatch => {
      dispatch({ payload:{}, type: API_FAILED });
    };
  }
  export default function loadAllProducts(response) { 
    return dispatch => {
      dispatch({  type: LOAD_ALL_PRODUCTS,
        payload: response });
      // router.transitionTo('/dashboard'); // will fire CHANGE_ROUTE in its change handler
    };
  }