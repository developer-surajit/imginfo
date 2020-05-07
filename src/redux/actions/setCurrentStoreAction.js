import {SET_CURRENT_STORE} from '../constants/types';

const setCurrentStoreAction = data => {
  return {
    type: SET_CURRENT_STORE,
    payload: data,
  };
};

export {setCurrentStoreAction};
