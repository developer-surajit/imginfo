import {REMOVE_CURRENT_USER} from '../constants/types';

const removeUserProfileDetailsAction = () => {
  return {
    type: REMOVE_CURRENT_USER,
  };
};

export {removeUserProfileDetailsAction};
