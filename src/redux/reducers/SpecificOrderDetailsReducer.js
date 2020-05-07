import isEmpty from '../../utils/isEmpty';

import {
  ORDERS_DETAILS_FETCHING_START,
  ORDERS_DETAILS_FETCHING_SUCCESS,
  CANCEL_CURRENT_ORDER,
  SEND_COMMENT,
} from '../constants/types.js';

const initialState = {
  data: {},
  //   cancelOrder: {},
  //   confirmOrder: {},
  //   getOrder: {
  // loading:false,
  // errors:null
  //   },
  loading: true,
  errors: null,
};

export default function(state = initialState, action) {
  // debugger;
  // console.log(action, 22, state);
  switch (action.type) {
    case ORDERS_DETAILS_FETCHING_SUCCESS:
      return {
        ...state,
        data: action.payload ? action.payload : {},
        loading: false,
      };
    case CANCEL_CURRENT_ORDER:
      return {
        ...state,
        data: {...state.data, status: 'cancelled'},
      };
    case SEND_COMMENT:
      return {
        ...state,
        data: {...state.data, comments: action.payload},
      };
    case ORDERS_DETAILS_FETCHING_START:
      return {
        ...state,
        errors: null,
        loading: true,
      };
    default:
      return state;
  }
}
