import {CHECK_NETWORK} from '../constants/types';

const checkNetworkAction = data => {
  return {
    type: CHECK_NETWORK,
    payload: data,
  };
};

export {checkNetworkAction};
