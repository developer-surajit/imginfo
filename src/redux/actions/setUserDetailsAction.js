import {SET_CURRENT_USER} from '../constants/types';

const setUserDetailsAction = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data,
  };
};

export {setUserDetailsAction};
