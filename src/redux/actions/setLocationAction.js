import {SET_LOCATION} from '../constants/types';
import Geolocation from '@react-native-community/geolocation';
import {toogleSpinnerAction} from './toogleSpinnerAction';
import {
  Alert,
  BackHandler,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
} from 'react-native';

const setLocationAction = position => dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: position,
  });

  // Geolocation.getCurrentPosition(
  //   position => {
  //     // console.log({position});

  // dispatch({
  //   type: SET_LOCATION,
  //   payload: position,
  // });
  //   },
  //   error => {
  //     Alert.alert(
  //       error.message,
  //       `Permission > Enable Location Permission
  //       `,
  //       [
  //         {
  //           text: 'Try again',
  //           onPress: () => dispatch(setLocationAction()),
  //         },
  //         {
  //           text: 'Enable Location Permission',
  //           onPress: () => {
  //             // Linking.openSettings();
  //             BackHandler.exitApp();
  //           },
  //           style: 'cancel',
  //         },
  //       ],
  //     );
  //     //   NavigationService.navigate('Auth');
  //   },
  //   {enableHighAccuracy: false, timeout: 10000},
  // );
};

export {setLocationAction};
