import {CHECK_NETWORK} from '../constants/types';

// const initialState = {
//   isConnected: false,
//   isInternetReachable: false,
// };

export default function(state = null, action) {
  switch (action.type) {
    case CHECK_NETWORK:
      return action.payload;
    default:
      return state;
  }
}
