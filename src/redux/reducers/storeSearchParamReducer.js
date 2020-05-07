import {
  SET_SEARCH_CATEGORY,
  TOGGLE_DELIVERY_TYPE_PICKUP,
  TOGGLE_DELIVERY_TYPE_DELIVER,
  SET_SEARCH_NAME,
  UPDATE_LIST_PAGE_COUNT,
  UPDATE_SEARCH_NAME,
  RESET_SEARCH_STORE_LIST,
  RESET_LIST_PAGE_COUNT,
  UPDATE_FILTER_PAGE_COUNT,
  RESET_FILTER_PAGE_COUNT,
} from '../constants/types';

const initialState = {
  cat_id: null,
  cat_name: null,
  pick_up: false,
  deliver: false,
  name: '',
  list_page: 1,
  filter_page: 1,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_CATEGORY:
      return {
        ...state,
        cat_id: action.payload.cat_id,
        cat_name: action.payload.cat_name,
      };
    case SET_SEARCH_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case TOGGLE_DELIVERY_TYPE_PICKUP:
      return {
        ...state,
        pick_up: !state.pick_up,
      };
    case TOGGLE_DELIVERY_TYPE_DELIVER:
      return {
        ...state,
        deliver: !state.deliver,
      };
    case UPDATE_SEARCH_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case UPDATE_LIST_PAGE_COUNT:
      return {
        ...state,
        list_page: state.list_page + 1,
      };
    case UPDATE_FILTER_PAGE_COUNT:
      return {
        ...state,
        filter_page: state.filter_page + 1,
      };
    case RESET_LIST_PAGE_COUNT:
      return {
        ...state,
        list_page: initialState.list_page,
      };
    case RESET_FILTER_PAGE_COUNT:
      return {
        ...state,
        filter_page: initialState.filter_page,
      };
    case RESET_SEARCH_STORE_LIST:
      return {
        ...state,
        list_page: initialState.list_page,
        filter_page: initialState.filter_page,
      };
    default:
      return state;
  }
}
