import {SET_LOCATION} from '../constants/types';

const setLocationAction = position => dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: position,
  });
};

export {setLocationAction};
