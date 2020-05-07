import isEmpty from '../../utils/isEmpty';

import {SET_SPINNER_TOGGLE} from '../constants/types';

const initialState = {
  spinner: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SPINNER_TOGGLE:
      return {
        spinner: action.payload,
      };
    default:
      return state;
  }
}
