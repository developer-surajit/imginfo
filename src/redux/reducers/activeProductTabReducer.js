import {SET_ACTIVE_PRODUCT_TAB} from '../constants/types';

const initialState = {
  activeTab: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_PRODUCT_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    default:
      return state;
  }
}
