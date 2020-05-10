import {toastAndroidiOS} from './toastAndroidiOS';
import isEmpty from './isEmpty';
const networkCheck = data => {
  if (!isEmpty(data)) {
    if (!data.isConnected || !data.isInternetReachable) {
      setTimeout(() => {
        toastAndroidiOS(
          'Internet not available! Please Check your network and try again.',
          1500,
        );
      }, 100);
      return true;
    }
  }
};

export default networkCheck;
