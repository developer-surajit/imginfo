import {toogleSpinnerAction} from './toogleSpinnerAction';
import {universalApiCall} from '../../utils/universalApiCall';
import networkCheck from '../../utils/networkCheck';

import {TOGGLE_FEV_PRODUCT} from '../constants/types';
import {toastAndroidiOS} from '../../utils/toastAndroidiOS';

const toggleFavouriteProductAction = data => (dispatch, getState) => {
  if (networkCheck(getState().checkNetworkReducer)) return;
  //   dispatch(toogleSpinnerAction(true));

  let submitData = {
    ...data,
    whist_status: data.whist_status == 'true' ? 0 : 1,
  };

  dispatch({
    type: TOGGLE_FEV_PRODUCT,
    payload: data,
  });

  universalApiCall('/pointlocationwhishlist', 'POST', submitData)
    .then(res => {
      console.log('toggle-list', res);
      //   if (res.data.status) {
      //     dispatch({
      //       type: TOGGLE_FEV_PRODUCT,
      //       payload: res.data.result,
      //     });
      //   }
      //   dispatch(toogleSpinnerAction(false));
    })
    .catch(err => {
      toastAndroidiOS(
        'Something went wrong in adding fev list, Please try again',
        1000,
      );
      //   dispatch(toogleSpinnerAction(false));
      console.log(err, err.response);
    });
};

export {toggleFavouriteProductAction};
