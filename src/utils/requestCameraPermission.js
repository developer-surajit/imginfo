import React from 'react';
import {Platform} from 'react-native';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';

const requestCameraPermission = () => {
  return new Promise((res, rej) => {
    if (Platform.OS == 'ios') {
      check(PERMISSIONS.IOS.CAMERA)
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
      checkMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ])
        .then(statuses => {
          console.log(statuses, 'permission check android');
          let cameraPermissionCheck = statuses[PERMISSIONS.ANDROID.CAMERA];
          let storagePermissionCheck =
            statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];

          // ====================

          if (
            cameraPermissionCheck === RESULTS.UNAVAILABLE ||
            storagePermissionCheck === RESULTS.UNAVAILABLE
          ) {
            // Unavailable
            return rej({type: 'unavailable', permissionName: 'CAMERA'});
          } else if (
            cameraPermissionCheck === RESULTS.GRANTED &&
            storagePermissionCheck === RESULTS.GRANTED
          ) {
            //Granted
            return res({type: 'granted', permissionName: 'CAMERA'});
          } else if (
            cameraPermissionCheck === RESULTS.BLOCKED ||
            storagePermissionCheck === RESULTS.BLOCKED
          ) {
            //Blocked permission
            return rej({type: 'blocked', permissionName: 'CAMERA'});
          } else {
            //request / ask for permission

            console.log('in else , requesting permission again');
            requestMultiple([
              PERMISSIONS.ANDROID.CAMERA,
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            ]).then(permissionRequests => {
              console.log(
                'requestMultiple Camera',
                permissionRequests[PERMISSIONS.ANDROID.CAMERA],
              );
              console.log(
                'requestMultiple storage',
                permissionRequests[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
              );

              let cameraPermissionAsk =
                permissionRequests[PERMISSIONS.ANDROID.CAMERA];
              let storagePermissionAsk =
                permissionRequests[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];

              ////////////////////
              if (
                cameraPermissionAsk === RESULTS.GRANTED &&
                storagePermissionAsk === RESULTS.GRANTED
              ) {
                //Granted
                return res({type: 'granted', permissionName: 'CAMERA'});
              } else if (
                cameraPermissionAsk === RESULTS.BLOCKED ||
                storagePermissionAsk === RESULTS.BLOCKED
              ) {
                //Blocked permission
                return rej({type: 'blocked', permissionName: 'CAMERA'});
              } else {
                // denied
                return rej({type: 'denied', permissionName: 'CAMERA'});
              }
            });
          }
        })
        .catch(error => {
          console.log('error in catch permission camera');
          return rej(error);
        });
    }
  });
};

export default requestCameraPermission;
