import isEmpty from '../../utils/isEmpty';

import {
  SET_OTP_VERIFICATION_ERROR,
  REMOVE_OTP_VERIFICATION_ERROR,
} from '../constants/types';

const initialState = {
  message: null,
  code: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_OTP_VERIFICATION_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case REMOVE_OTP_VERIFICATION_ERROR:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
}
