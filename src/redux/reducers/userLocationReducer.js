import {SET_LOCATION} from '../constants/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      // console.log(action.payload, 'payload');
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
