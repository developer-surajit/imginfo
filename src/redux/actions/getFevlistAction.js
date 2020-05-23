import {toogleSpinnerAction} from './toogleSpinnerAction';
import {universalApiCall} from '../../utils/universalApiCall';
import networkCheck from '../../utils/networkCheck';

import {SET_FEV_PRODUCT_LIST} from '../constants/types';
import {toastAndroidiOS} from '../../utils/toastAndroidiOS';

const getFevlistAction = () => (dispatch, getState) => {
  if (networkCheck(getState().checkNetworkReducer)) return;
  dispatch(toogleSpinnerAction(true));

  let data = {
    user_id: getState().userProfileDetailsReducer.user_id,
  };

  universalApiCall('/pointlocationwhishlistbyuserid', 'POST', data)
    .then(res => {
      console.log('favorite-product-list', res);
      if (res.data.status) {
        dispatch({
          type: SET_FEV_PRODUCT_LIST,
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

export {getFevlistAction};
