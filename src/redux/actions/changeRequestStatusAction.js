import {CHANGE_STATUS} from '../constants/types';

const changeRequestStatusAction = data => {
  return {
    type: CHANGE_STATUS,
    payload: data,
  };
};

export {changeRequestStatusAction};
