import isEmpty from '../../utils/isEmpty';

import {
  SET_CURRENT_USER,
  TOGGLE_USER_VERIFICATION_MODAL,
  REMOVE_CURRENT_USER,
} from '../constants/types';
const initialState = {
  name: null,
  user_id: null,
  email: null,
  phone: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
      };
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
