import {PRODUCT_MAIN_CATEGORY_LIST} from '../constants/types';

// const initialState = {
//   isConnected: false,
//   isInternetReachable: false,
// };

export default function (state = null, action) {
  switch (action.type) {
    case PRODUCT_MAIN_CATEGORY_LIST:
      return action.payload;
    default:
      return state;
  }
}
