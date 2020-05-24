import {SET_CURRENT_LANG} from '../constants/types';

const setCurrentLanguage = data => {
  return {
    type: SET_CURRENT_LANG,
    payload: data,
  };
};

export {setCurrentLanguage};
