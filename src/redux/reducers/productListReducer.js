import {
  SET_PRODUCT_LIST,
  RESET_PRODUCT_STORE_LIST,
  SET_FEV_PRODUCT_LIST,
  TOGGLE_FEV_PRODUCT,
} from '../constants/types';
import isEmpty from '../../utils/isEmpty';

const initialState = {
  productList: [],
  fevProductList: [],
  // filteredProductList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    case SET_FEV_PRODUCT_LIST:
      return {
        ...state,
        fevProductList: action.payload,
      };
    case TOGGLE_FEV_PRODUCT:
      let productList;
      let fevProductList;

      if (!isEmpty(state.productList)) {
        productList = state.productList.map(item => {
          if (item.product_id == action.payload.product_id) {
            item.is_whistlist = item.is_whistlist == 'true' ? 'false' : 'true';
          }
          return item;
        });
      } else {
        productList = state.productList;
      }

      if (action.payload.whist_status == 'true') {
        console.log('true', action.payload.whist_status);
        fevProductList = state.fevProductList.filter(item => {
          if (item.product_id == action.payload.product_id) {
            return false;
          }
          return true;
        });
      } else {
        console.log('false');
        fevProductList = [...state.fevProductList];
        state.productList.forEach(item => {
          if (item.product_id == action.payload.product_id) {
            item.is_whistlist = 'true';
            fevProductList.push(item);
          }
        });
        console.log(fevProductList, 'fevProductList');
      }

      console.log(productList, fevProductList, 'toggle list reducer');
      return {
        ...state,
        productList,
        fevProductList,
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
