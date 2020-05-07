import isEmpty from '../../utils/isEmpty';

import {
  ORDERS_FETCHING_START,
  ORDERS_FETCHING_SUCCESS,
} from '../constants/types';

const initialState = {
  orders: [],
  loading: true,
  errors: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORDERS_FETCHING_SUCCESS:
      return {...state, loading: false, orders: [...action.payload]};
    case ORDERS_FETCHING_START:
      return {...initialState, loading: true};
    default:
      return state;
  }
}
