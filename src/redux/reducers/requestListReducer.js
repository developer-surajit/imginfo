import isEmpty from '../../utils/isEmpty';

import {
  GET_REQUEST_LIST,
  CHANGE_STATUS,
  GET_SENT_REQUEST_LIST,
} from '../constants/types.js';

const initialState = {
  request_list: [],
  sent_request_list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REQUEST_LIST:
      return {
        ...state,
        request_list: action.payload,
      };
    case GET_SENT_REQUEST_LIST:
      return {
        ...state,
        sent_request_list: action.payload,
      };
    case CHANGE_STATUS:
      let request_list = state.request_list.map(item => {
        if (item.request_id == action.payload.request_id) {
          item.status = action.payload.status == 1 ? 'allow' : 'deny';
        }
        return item;
      });
      return {
        ...state,
        // request_list: action.payload,
        request_list,
      };

    default:
      return state;
  }
}
