import {toogleSpinnerAction} from './toogleSpinnerAction';
import {universalApiCall} from '../../utils/universalApiCall';
import networkCheck from '../../utils/networkCheck';

import {SET_PRODUCT_LIST_MAP} from '../constants/types';
import {toastAndroidiOS} from '../../utils/toastAndroidiOS';

const getProductListForMapAction = data => (dispatch, getState) => {
  if (networkCheck(getState().checkNetworkReducer)) return;
  dispatch(toogleSpinnerAction(true));

  universalApiCall('/listpointlocationbyuserandredius', 'POST', data)
    .then(res => {
      console.log('product-list', res);
      if (res.data.status) {
        dispatch({
          type: SET_PRODUCT_LIST_MAP,
          payload: res.data.result,
        });
      }
      dispatch(toogleSpinnerAction(false));
    })
    .catch(err => {
      toastAndroidiOS(
        'Something went wrong in getting category list, Please try again',
        1000,
      );
      dispatch(toogleSpinnerAction(false));
      console.log(err, err.response);
    });
};

export {getProductListForMapAction};
