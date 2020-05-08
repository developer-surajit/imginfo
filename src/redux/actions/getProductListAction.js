import {toogleSpinnerAction} from './toogleSpinnerAction';
import {universalApiCall} from '../../utils/universalApiCall';
import networkCheck from '../../utils/networkCheck';
import {ToastAndroid} from 'react-native';
import {SET_PRODUCT_LIST} from '../constants/types';

const getProductListAction = data => (dispatch, getState) => {
  if (networkCheck(getState().checkNetworkReducer)) return;
  dispatch(toogleSpinnerAction(true));

  universalApiCall('/listpointlocationbyuserandredius', 'post', data)
    .then(res => {
      console.log('product-list', res);
      if (res.data.status) {
        dispatch({
          type: SET_PRODUCT_LIST,
          payload: res.data.result,
        });
      }
      dispatch(toogleSpinnerAction(false));
    })
    .catch(err => {
      ToastAndroid.show(
        'Something went wrong in getting category list, Please try again',
        1000,
      );
      dispatch(toogleSpinnerAction(false));
      console.log(err, err.response);
    });
};

export {getProductListAction};
