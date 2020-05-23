import {SET_PRODUCT_LIST_MAP} from '../constants/types';
import isEmpty from '../../utils/isEmpty';

const initialState = {
  mapList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT_LIST_MAP:
      return {
        ...state,
        mapList: action.payload,
      };

    default:
      return state;
  }
}
