import React from 'react';
import {Platform} from 'react-native';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';

const requestGpsPermission = async () => {
  return new Promise((res, rej) => {
    if (Platform.OS == 'ios') {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          console.log('error in catch permission camera');
        });
    } else {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              return rej({type: 'unavailable', permissionName: 'LOCATION'});
            // break;
            case RESULTS.DENIED:
              request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                .then(requestRes => {
                  switch (requestRes) {
                    case RESULTS.DENIED:
                      return rej({type: 'denied', permissionName: 'LOCATION'});
                    case RESULTS.GRANTED:
                      return res({type: 'granted', permissionName: 'LOCATION'});
                    case RESULTS.BLOCKED:
                      return rej({type: 'blocked', permissionName: 'LOCATION'});
                  }
                })
                .catch(error => {
                  console.log('error in catch permission location');
                });
              break;
            case RESULTS.GRANTED:
              return res({type: 'granted', permissionName: 'LOCATION'});
            // break;
            case RESULTS.BLOCKED:
              return rej({type: 'blocked', permissionName: 'LOCATION'});
            // break;
          }
        })
        .catch(error => {
          console.log('error in catch permission location');
        });
    }
  });
};

export default requestGpsPermission;
