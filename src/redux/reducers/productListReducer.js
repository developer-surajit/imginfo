import {SET_PRODUCT_LIST, RESET_PRODUCT_STORE_LIST} from '../constants/types';
import isEmpty from '../../utils/isEmpty';

const initialState = {
  productList: [],
  // filteredProductList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };

    case RESET_PRODUCT_STORE_LIST:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
