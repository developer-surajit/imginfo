import isEmpty from '../../utils/isEmpty';

import {GET_REQUEST_LIST} from '../constants/types.js';

const initialState = {
  request_list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REQUEST_LIST:
      return {
        ...state,
        request_list: action.payload,
      };

    default:
      return state;
  }
}
