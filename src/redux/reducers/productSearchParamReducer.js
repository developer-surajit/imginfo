import {
  SET_PRODUCT_MAIN_CATEGORY_ID,
  SET_PRODUCT_SEARCH_NAME,
} from '../constants/types';

const initialState = {
  product_cat_id: null,
  name: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT_MAIN_CATEGORY_ID:
      return {
        ...state,
        product_cat_id: action.payload,
      };
    case SET_PRODUCT_SEARCH_NAME:
      return {
        ...state,
        name: action.payload ? action.payload : '',
      };
    default:
      return state;
  }
}
