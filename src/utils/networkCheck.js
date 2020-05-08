import {Alert, ToastAndroid} from 'react-native';
import isEmpty from './isEmpty';
const networkCheck = data => {
  if (!isEmpty(data)) {
    if (!data.isConnected || !data.isInternetReachable) {
      setTimeout(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Internet not available! Please Check your network and try again.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          50,
        );
      }, 100);
      return true;
    }
  }
};

export default networkCheck;
