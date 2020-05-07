import {SET_NAV_STATE} from '../constants/types';

const initialState = {};

export default function(state = initialState, action) {
  // console.log({action});
  switch (action.type) {
    case SET_NAV_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
