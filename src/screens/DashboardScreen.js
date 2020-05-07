import React, {Component} from 'react';
import {
  Text,
  ViewComponent,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  BackHandler,
  Alert,
  Linking,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../constants/Colors';
import {universalApiCall} from '../utils/universalApiCall';
import {Button, Divider} from 'react-native-elements';
import {AppHeader} from '../shared/components';
import Slider from '@react-native-community/slider';
const placeHolderImg = require('./../assets/images/placeholder-1.jpg');
import requestGpsPermission from '../utils/requestGpsPermission';
import enableGpsAndroid from '../utils/enableGpsAndroid';
import getUserLocation from '../utils/getUserLocation';
// import {SET_LOCATION} from '../constants/types';
import {setLocationAction} from '../redux/actions';
import {connect} from 'react-redux';

let DATA = [
  {
    avg_rating: '5',
    datetime: '2020-05-06 14:14:27',
    desc: 'postman test',
    distance_val: 0,
    image: 'image/1588747904splash.jpeg',
    lat: '23.1078175',
    lon: '87.071008',
    product_id: '43',
    property_type: 'private',
    user_id: '45',
  },
  {
    avg_rating: '0',
    datetime: '2020-05-06 06:49:06',
    desc: 'Testing org lat lng',
    distance_val: 0,
    image: 'image/1588747746c8a277f9-9191-4f78-91a7-a87d6822f62e.jpg',
    lat: '23.1078175',
    lon: '87.071008',
    product_id: '42',
    property_type: 'public',
    user_id: '45',
  },
];

class DashboardScreen extends Component {
  state = {
    loading: true,
    imgData: [],
    rangeLow: null,
    rangeHigh: null,
    range: 50,
  };

  componentDidMount = () => {
    this.askPermissionAndGetLocation();
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
            if (userLocation.mocked) {
              // Alert.alert(
              //   'Mocked Location',
              //   `Please turn off mocked location and try again.`,
              //   [
              //     {
              //       text: 'Try again',
              //       onPress: () => this.askPermissionAndGetLocation(),
              //     },
              //     {
              //       text: 'Exit App',
              //       onPress: () => BackHandler.exitApp(),
              //       style: 'cancel',
              //     },
              //   ],
              // );
              this.props.setLocationAction(userLocation);
              this.setState(
                {
                  userLocation: userLocation.userLocation,
                },
                () => this.getPhotoList(),
              );
            } else {
              this.props.setLocationAction(userLocation);
              this.setState(
                {
                  userLocation: userLocation.userLocation,
                },
                () => this.getPhotoList(),
              );
            }
          }
        }

        // this.getLocation();
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

  getPhotoList = async () => {
    try {
      this.setState({
        loading: true,
      });
      let userId = await AsyncStorage.getItem('user_id');

      let data = await universalApiCall(
        '/listpointlocationbyuserandredius',
        'POST',
        {
          // user_id: JSON.parse(userId),
          redius: this.state.range,
          // lat: 23.3097715,
          // lon: 87.3766212,
          lat: this.state.userLocation.latitude,
          lon: this.state.userLocation.longitude,
        },
      );

      if (data.data.status) {
        this.setState({
          imgData: data.data.result,
        });
      }

      this.setState({
        loading: false,
      });

      console.log(data, 'search by radius');
    } catch (error) {
      this.setState({
        loading: false,
      });
      ToastAndroid.show('Something is wrong, try again', 1000);
      console.log(error, error.response, 'in dashboard get data');
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <AppHeader />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Text style={{marginTop: 15, fontSize: 16}}>
            Searching withing {this.state.range} km range
          </Text>

          <Slider
            style={{width: '70%', height: 40}}
            minimumValue={1}
            maximumValue={200}
            step={5}
            value={this.state.range}
            minimumTrackTintColor={Colors.main_color}
            maximumTrackTintColor="#000000"
            onSlidingComplete={range => {
              console.log(range);
              this.setState({range}, () => this.askPermissionAndGetLocation());
            }}
          />
        </View>
        {this.state.permissionError ? (
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 15,
              // marginVertical: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#ef5350',
                backgroundColor: '#ffcdd2',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 3,
              }}>
              {this.state.permissionError}
            </Text>
          </View>
        ) : null}
        <Spinner
          textContent="Loading.."
          visible={this.state.loading}
          overlayColor="rgba(0,0,0,0.5)"
          textStyle={{color: 'white'}}
        />
        <View
          style={{
            flex: 1,
            // justifyContent: 'space-between',
            // marginHorizontal: 15,
            // padding: 10,
            borderRadius: 5,
            // elevation: 1,
            marginBottom: 15,
            marginTop: 10,
          }}>
          <FlatList
            // data={DATA}
            data={this.state.imgData}
            renderItem={({item}) => (
              <View
                style={{
                  elevation: 5,
                  marginBottom: 15,
                  backgroundColor: 'white',
                  marginHorizontal: 15,
                  borderRadius: 4,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  // style={{marginBottom: 25}}
                  onPress={() =>
                    this.props.navigation.navigate('ProductDeatilsScreen', {
                      product_id: item.product_id,
                    })
                  }>
                  <Image
                    source={{
                      uri: `https://iodroid.in/redfrugten/uploads/${item.image}`,
                    }}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: 200,
                      // marginHorizontal: 15,
                      resizeMode: 'cover',
                      // borderRadius: 4,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      // marginTop: 15,
                      fontFamily: 'sans-serif-medium',
                      paddingVertical: 15,
                      paddingHorizontal: 15,
                    }}>
                    Description :{' '}
                    <Text
                      style={{fontSize: 16, fontFamily: 'sans-serif-regular'}}>
                      {item.desc}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginHorizontal: 15,
                }}>
                <Image
                  source={placeHolderImg}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: 200,
                    resizeMode: 'cover',
                    borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 15,
                    paddingLeft: 5,
                  }}>
                  No image found
                </Text>
              </View>
            }
            keyExtractor={(item, i) => item.product_id}
          />

          <View
            style={{
              paddingTop: 15,
              borderTopColor: ' rgba(0, 0, 0, 0.10)',
              borderTopWidth: StyleSheet.hairlineWidth,
            }}>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{
                  borderRadius: 50,
                  backgroundColor: Colors.main_color,
                }}
                containerStyle={{marginHorizontal: 20}}
                title="Upload"
                onPress={() => {
                  this.props.navigation.navigate('HomeScreen');
                }}
                titleStyle={{color: 'white'}}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

export default connect(null, {
  setLocationAction,
})(DashboardScreen);
