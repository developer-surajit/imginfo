import {
  SET_SELECTED_STORE_ORDER_LIST,
  RESET_SELECTED_STORE_ORDER_LIST,
  REMOVE_ITEM_STORE_ORDER_LIST,
} from '../constants/types';
import isEmpty from '../../utils/isEmpty';

const initialState = {
  orderList: [
    // {
    //   item_name: 'Golden Rice 5 kg',
    //   item_quantity: 1,
    //   item_price: 450,
    //   item_id: '5e8d7de5913c71001770aa8c',
    // },
    // {
    //   item_name: 'Ashirwad 10 kg',
    //   item_quantity: 1,
    //   item_price: 390,
    //   item_id: '5e8d7e98913c71001770aa8d',
    // },
    // {
    //   item_name: 'Samsung On7 Note',
    //   item_quantity: 1,
    //   item_price: 13000,
    //   item_id: '5e8d7d4b913c71001770aa8a',
    // },
    // {
    //   item_name: 'Realme 3 pro',
    //   item_quantity: 1,
    //   item_price: 12000,
    //   item_id: '5e8d7d6b913c71001770aa8b',
    // },
  ],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_STORE_ORDER_LIST:
      let orderList = [...state.orderList];
      if (isEmpty(orderList)) {
        orderList.push(action.payload);
      } else {
        // console.log('else');
        let index;
        if (
          orderList.some((elm, i) => {
            if (
              action.payload.item_id &&
              elm.item_id == action.payload.item_id
            ) {
              // console.log('if');
              index = i;
              return true;
            }
            return false;
          })
        ) {
          orderList[index].item_quantity =
            parseInt(orderList[index].item_quantity) +
            parseInt(action.payload.item_quantity);
        } else {
          orderList.push(action.payload);
        }
      }
      return {
        ...state,
        orderList,
        // orderList: [...state.orderList, action.payload],
      };
    case REMOVE_ITEM_STORE_ORDER_LIST:
      let filteredOrderList = [...state.orderList];
      if (!isEmpty(filteredOrderList)) {
        filteredOrderList = filteredOrderList.filter(
          item => item.item_id !== action.payload,
        );
      }
      return {
        ...state,
        orderList: filteredOrderList,
      };
    case RESET_SELECTED_STORE_ORDER_LIST:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
