import {SET_ERRORS, REMOVE_ERRORS} from '../constants/types';

export default function(state = {error: false, errorMsg: null}, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        error: true,
        errorMsg: action.payload,
      };
    case REMOVE_ERRORS:
      return {
        ...state,
        error: false,
        errorMsg: null,
      };
    default:
      return state;
  }
}
