import {
  SET_PRODUCT_LIST,
  FILTER_PRODUCT_LIST_BY_NAME,
  RESET_PRODUCT_STORE_LIST,
  INCREASE_PRODUCT_COUNT,
  DECREASE_PRODUCT_COUNT,
  SET_PRODUCT_MAIN_CATEGORY_ID,
  ADD_NOT_LISTED_PRODUCT,
  DECREASE_CUSTOM_PRODUCT_COUNT,
  INCREASE_CUSTOM_PRODUCT_COUNT,
} from '../constants/types';
import isEmpty from '../../utils/isEmpty';

const initialState = {
  productList: [],
  filteredProductList: [],
  orderListItems: [],
};

const getOrderList = list => {
  let ListItem = list.filter(item => item.count && item.count > 0);
  return ListItem;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
        filteredProductList: action.payload,
        orderListItems: getOrderList(action.payload),
      };
    case INCREASE_PRODUCT_COUNT:
      let productList = state.productList.map(item => {
        if (item.count) {
          if (action.payload == item._id) {
            item.count = item.count + 1;
          }
        } else {
          if (action.payload == item._id) {
            item.count = 1;
          }
        }

        return item;
      });

      return {
        ...state,
        productList: productList,
        orderListItems: getOrderList(productList),
      };

    case DECREASE_PRODUCT_COUNT:
      productList = state.productList.map(item => {
        if (item.count && action.payload == item._id && item.count * 1 > 0) {
          item.count = item.count - 1;
        }

        return item;
      });

      return {
        ...state,
        productList: productList,
        orderListItems: getOrderList(productList),
      };
    case DECREASE_CUSTOM_PRODUCT_COUNT:
      orderListItems = state.orderListItems
        .map(item => {
          if (item.count && action.payload == item._id && item.count * 1 > 0) {
            item.count = item.count - 1;
          }

          return item;
        })
        .filter(item => item.count > 0);

      return {
        ...state,

        orderListItems,
      };
    case INCREASE_CUSTOM_PRODUCT_COUNT:
      let orderListItems = state.orderListItems.map(item => {
        if (item.count) {
          if (action.payload == item._id) {
            item.count = item.count + 1;
          }
        } else {
          if (action.payload == item._id) {
            item.count = 1;
          }
        }

        return item;
      });
      return {
        ...state,
        orderListItems,
      };

    case FILTER_PRODUCT_LIST_BY_NAME:
      filteredProductList = [];
      if (!isEmpty(action.payload) && !isEmpty(state.productList)) {
        filteredProductList = state.productList.filter(item =>
          item.name.toLowerCase().includes(action.payload.toLowerCase()),
        );
      } else {
        filteredProductList = [...state.productList];
      }

      return {
        ...state,
        filteredProductList,
      };
    case SET_PRODUCT_MAIN_CATEGORY_ID:
      //  filteredProductList = [];
      if (!isEmpty(action.payload) && !isEmpty(state.productList)) {
        filteredProductList = state.productList.filter(item =>
          item.product_category_id.some(
            element => element._id == action.payload,
          ),
        );
      } else {
        filteredProductList = state.productList;
      }

      return {
        ...state,
        filteredProductList: filteredProductList,
      };
    case ADD_NOT_LISTED_PRODUCT:
      return {
        ...state,
        orderListItems: [...state.orderListItems, action.payload],
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
