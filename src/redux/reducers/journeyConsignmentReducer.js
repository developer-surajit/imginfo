import {
  GET_REMAINING_CONSIGNMENT,
  TOGGLE_SELECTED_CONSIGNMENT,
  TOGGLE_SELECT_ALL_CONSIGNMENT,
  RESET_JOURNEY_CONSIGNMENT_REDUCER,
} from '../constants/types';

const initialState = {
  remainingConsignments: [],
  selectedConsignments: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REMAINING_CONSIGNMENT:
      return {
        ...state,
        remainingConsignments: action.payload,
      };
    case TOGGLE_SELECTED_CONSIGNMENT:
      return {
        ...state,
        selectedConsignments: action.payload,
      };
    case TOGGLE_SELECT_ALL_CONSIGNMENT:
      let allSelected =
        state.remainingConsignments.length ===
        state.selectedConsignments.length;
      return {
        ...state,
        selectedConsignments: allSelected ? [] : state.remainingConsignments,
      };
    case RESET_JOURNEY_CONSIGNMENT_REDUCER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
