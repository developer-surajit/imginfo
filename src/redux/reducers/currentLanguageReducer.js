import {SET_CURRENT_LANG} from '../constants/types';
import I18n from '../../utils/I18n';

const initialState = {
  currentLanguage: I18n.currentLocale(),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_LANG:
      return {
        ...state,
        currentLanguage: action.payload,
      };

    default:
      return state;
  }
}
