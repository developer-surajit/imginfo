import {toogleSpinnerAction} from './toogleSpinnerAction';
import {universalApiCall} from '../../utils/universalApiCall';
import networkCheck from '../../utils/networkCheck';
import {toastAndroidiOS} from '../../utils/toastAndroidiOS';
import {GET_SENT_REQUEST_LIST} from '../constants/types';

const getSentRequestListAction = () => (dispatch, getState) => {
  if (networkCheck(getState().checkNetworkReducer)) return;
  // dispatch(toogleSpinnerAction(true));
  let data = {
    user_id: getState().userProfileDetailsReducer.user_id,
  };
  universalApiCall('/listrequestownerbyuser', 'post', data)
    .then(res => {
      console.log('incomit request-list', res);
      if (res.data.status) {
        dispatch({
          type: GET_SENT_REQUEST_LIST,
          payload: res.data.result,
        });
      }
      // dispatch(toogleSpinnerAction(false));
    })
    .catch(err => {
      toastAndroidiOS(
        'Something went wrong in getting request list, Please try again',
        1000,
      );
      // dispatch(toogleSpinnerAction(false));
      console.log(err, err.response);
    });
};

export {getSentRequestListAction};
