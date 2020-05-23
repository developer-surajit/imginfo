import React, {Component} from 'react';
import {View, Text, BackHandler, StyleSheet} from 'react-native';
import {
  setLocationAction,
  getProductListForMapAction,
  toogleSpinnerAction,
  getFevlistAction,
  getProductListAction,
} from '../redux/actions';
import {connect} from 'react-redux';
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../constants/Colors';
import requestGpsPermission from '../utils/requestGpsPermission';
import enableGpsAndroid from '../utils/enableGpsAndroid';
import getUserLocation from '../utils/getUserLocation';
import Geolocation from '@react-native-community/geolocation';
import isEmpty from '../utils/isEmpty';

import MapView from 'react-native-map-clustering';

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class MapTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.mapRef = React.createRef();
  }

  watchID = null;

  componentDidMount = () => {
    this.askPermissionAndGetLocation();
    this.props.getFevlistAction();
    // this.props.toogleSpinnerAction(true);
  };

  watchUserLocation = () => {
    this.watchID = Geolocation.watchPosition(
      position => {
        let userLocation = {
          userLocation: {
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        };
        this.props.setLocationAction(userLocation);
        // console.log({userLocation});
      },
      error => console.log(JSON.stringify(error.message)),
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 50,
      },
    );

    console.log(this.watchID, 'watch id');
  };

  componentWillUnmount = () => {
    console.log('Clear watch');
    Geolocation.clearWatch(this.watchID);
  };

  askPermissionAndGetLocation = async () => {
    try {
      let checkGpsPermission = await requestGpsPermission();
      console.log('checkGpsPermission', checkGpsPermission);
      if (checkGpsPermission.type == 'granted') {
        // check if the gps is on in the device
        if (Platform.OS === 'android') {
          let enableGps = await enableGpsAndroid();
          if (enableGps == 'enabled' || enableGps == 'already-enabled') {
            // then ask user's location
            let userLocation = await getUserLocation();
            this.props.setLocationAction(userLocation);
            this.searchProduct();
            this.watchUserLocation();
          }
        }
      }
    } catch (error) {
      console.log(error, 'askPermissionAndGetLocation');
      if (error.type == 'error_GPS_disabled') {
        Alert.alert(
          'GPS Disabled',
          'Please enable GPS to search for nearby stores',
          [
            {
              text: 'Try again',
              onPress: () => this.askPermissionAndGetLocation(),
            },
            {
              text: 'Close App',
              onPress: () => {
                BackHandler.exitApp();
              },
              style: 'cancel',
            },
          ],
        );
      } else if (
        error.type == 'error_GPS_permission' ||
        error.type == 'blocked'
      ) {
        Alert.alert(
          'Location Permission Denied',
          "Please allow app's location permission to search nearby stores",
          [
            {
              text: 'Change permission',
              onPress: () => this.openSettings(),
            },
            {
              text: 'Close App',
              onPress: () => {
                BackHandler.exitApp();
              },
              style: 'cancel',
            },
          ],
        );
      }
    }
  };

  openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.log('error in openSettings', error);
    }
  };

  searchProduct = () => {
    if (this.props.userLocationReducer.userLocation) {
      this.props.getProductListForMapAction({
        redius: 200,
        lat: this.props.userLocationReducer.userLocation.latitude,
        lon: this.props.userLocationReducer.userLocation.longitude,
      });
    }
    // this.props.getProductListAction({
    //   redius: 50,
    //   lat: this.props.userLocationReducer.userLocation.latitude,
    //   lon: this.props.userLocationReducer.userLocation.longitude,
    // });
  };

  render() {
    let {userLocation} = this.props.userLocationReducer;
    let cords =
      !isEmpty(this.props.productListForMapReducer.mapList) &&
      this.props.productListForMapReducer.mapList.map(item => {
        return {
          latitude: item.lat,
          longitude: item.lon,
        };
      });

    console.log({cords});
    return (
      <View style={{flex: 1}}>
        <Spinner
          textContent="Loading.."
          visible={this.props.spinner}
          overlayColor="rgba(0,0,0,0.5)"
          textStyle={{color: 'white'}}
        />
        {!isEmpty(userLocation) && (
          <MapView
            minZoomLevel={5}
            showsUserLocation={true}
            ref={this.mapRef}
            edgePadding={{top: 150, left: 150, bottom: 50, right: 50}}
            // provider={PROVIDER_GOOGLE}
            onLayout={() => {
              console.log('map ref', this.mapRef.current);
              // this.props.productListForMapReducer.productList > 0 &&
              //   this.mapRef.fitToCoordinates(cords, {
              //     edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
              //     animated: true,
              //   });
            }}
            style={styles.map}
            // region={userLocation}
            initialRegion={userLocation}>
            {!isEmpty(this.props.productListForMapReducer.mapList) &&
              this.props.productListForMapReducer.mapList.map(item => (
                <Marker
                  key={parseInt(item.product_id)}
                  coordinate={{
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.lon),
                  }}
                />
              ))}
            {/* <Marker coordinate={{latitude: 52.4, longitude: 18.7}} />
            <Marker coordinate={{latitude: 52.1, longitude: 18.4}} />
            <Marker coordinate={{latitude: 52.6, longitude: 18.3}} />
            <Marker coordinate={{latitude: 51.6, longitude: 18.0}} />
            <Marker coordinate={{latitude: 53.1, longitude: 18.8}} />
            <Marker coordinate={{latitude: 52.9, longitude: 19.4}} />
            <Marker coordinate={{latitude: 52.2, longitude: 21}} />
            <Marker coordinate={{latitude: 52.4, longitude: 21}} />
            <Marker coordinate={{latitude: 51.8, longitude: 20}} /> */}
          </MapView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = state => ({
  userLocationReducer: state.userLocationReducer,
  checkNetworkReducer: state.checkNetworkReducer,
  productListForMapReducer: state.productListForMapReducer,
  spinner: state.spinnerToggleReducers.spinner,
});

export default connect(mapStateToProps, {
  setLocationAction,
  getProductListForMapAction,
  toogleSpinnerAction,
  getFevlistAction,
  getProductListAction,
})(MapTabScreen);
