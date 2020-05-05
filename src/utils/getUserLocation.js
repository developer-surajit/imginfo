import React from 'react';
import {Alert, BackHandler} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

getUserLocation = () => {
  return new Promise((res, rej) => {
    Geolocation.getCurrentPosition(
      position => {
        console.log({position});
        if (position.mocked) {
          //   Alert.alert(
          //     'Mocked Location',
          //     `Please turn off mocked location and try again.`,
          //     [
          //       {
          //         text: 'Try again',
          //         onPress: () => this.getUserLocation(),
          //       },
          //       {
          //         text: 'Exit App',
          //         onPress: () => BackHandler.exitApp(),
          //         style: 'cancel',
          //       },
          //     ],
          //   );
          res({
            userLocation: {
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            mocked: true,
          });
        } else {
          res({
            userLocation: {
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            mocked: false,
          });
        }
      },
      error => {
        console.log(error, 'in getUserLocation');
        rej(error);
      },
      {enableHighAccuracy: false, timeout: 10000},
    );
  });
};

export default getUserLocation;
