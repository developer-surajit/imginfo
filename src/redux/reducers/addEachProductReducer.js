import {
  SET_CURRENT_PRODUCT,
  SET_CURRENT_PRODUCT_COUNT,
  RESET_CURRENT_PRODUCT,
} from '../constants/types';

const initialState = {
  currentList: [],
};
// const initialState = {
//   name: null,
//   count: 0,
//   price_per_unit: null,
//   _id: null,
// };

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentList: action.payload,
      };
    case SET_CURRENT_PRODUCT_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case RESET_CURRENT_PRODUCT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
