import {SET_SPINNER_TOGGLE} from '../constants/types';

const toogleSpinnerAction = data => {
  return {
    type: SET_SPINNER_TOGGLE,
    payload: data,
  };
};

export {toogleSpinnerAction};
