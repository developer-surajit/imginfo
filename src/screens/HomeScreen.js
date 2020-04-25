import React, {Component} from 'react';
import {
  Text,
  ViewComponent,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ProgressBarAndroid,
  BackHandler,
  Image,
  ImageBackground,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-elements';
// import Axios from 'axios';
// import {server} from '../config/keys';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
// import {
//   StepHeaderTitle,
//   Header,
//   ImageBackgroundDesign,
//   HeaderGradient,
// } from '../shared/components';
// import {universalApiCall} from '../utils/universalApiCall';
// import Colors from '../constants/Colors';
// import networkCheck from '../utils/networkCheck';
// import isEmpty from '../utils/isEmpty';

export default class HomeScreen extends Component {
  state = {
    imageUploading: false,
    imageUploadParcentage: 0,
    uploadImageSuccessful: false,
    profileImageURI: null,
    permissionError: null,
    hasLocationPermission: false,
    userLocation: null,
    loading: true,
  };

  componentDidMount = () => {
    this.requestGpsPermission();
  };

  requestGpsPermission = async () => {
    try {
      const gpsPermissionResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(
        gpsPermissionResult,
        PermissionsAndroid.RESULTS,
        'GPS permission',
      );

      if (gpsPermissionResult === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        this.setState({
          permissionError:
            "Please allow GPS permission from app's permission settings or reinstall the app to upload images",
        });
        Alert.alert(
          'Permission error',
          `- Please allow GPS permission from app's permission settings or reinstall the app to upload images`,
          [
            {
              text: 'Try again',
              onPress: () => this.requestGpsPermission(),
            },
            {
              text: 'Exit App',
              onPress: () => BackHandler.exitApp(),
              style: 'cancel',
            },
          ],
        );
      } else if (gpsPermissionResult === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted');
        this.setState(
          {
            permissionError: '',
          },
          () => this.getUserLocation(),
        );
      } else {
        this.setState({
          permissionError: 'Please allow Storage permission to upload images',
        });
        Alert.alert('Permission error', `- Please check if GPS is disabled `, [
          {
            text: 'Try again',
            onPress: () => this.requestGpsPermission(),
          },
          {
            text: 'Exit App',
            onPress: () => BackHandler.exitApp(),
            style: 'cancel',
          },
        ]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  getUserLocation = () => {
    console.log('get getUserLocation');

    Geolocation.getCurrentPosition(
      position => {
        console.log({position});
        if (position.mocked) {
          Alert.alert(
            'Mocked Location',
            `Please turn off mocked location and try again.`,
            [
              {
                text: 'Try again',
                onPress: () => this.getUserLocation(),
              },
              {
                text: 'Exit App',
                onPress: () => BackHandler.exitApp(),
                style: 'cancel',
              },
            ],
          );
        } else {
          this.setState({
            userLocation: {
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            loading: false,
          });
        }
      },
      error => {
        console.log(error, 'in getUserLocation');
      },
      {enableHighAccuracy: false, timeout: 10000},
    );
  };

  requestCameraPermission = async type => {
    try {
      const cameraPermissionResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      const storagePermissionResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      console.log(
        'permission',
        storagePermissionResult,
        cameraPermissionResult,
      );

      if (
        storagePermissionResult ===
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
        cameraPermissionResult === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        this.setState({
          permissionError:
            'Please allow Camera and Storage permission from app settings or reinstall the app to upload images',
        });
      } else if (
        storagePermissionResult === PermissionsAndroid.RESULTS.GRANTED &&
        cameraPermissionResult === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the camera');
        this.setState(
          {
            permissionError: '',
          },
          () => {
            if (type == 'TAKE') {
              this.takePicture();
            } else {
              this.choosePicture();
            }
          },
        );
      } else {
        this.setState({
          permissionError:
            'Please allow Camera and Storage permission to upload images',
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  takePicture = () => {
    ImagePicker.openCamera({
      width: 900,
      height: 1200,
      cropping: false,
      compressImageQuality: 0.9,
      // compressImageMaxWidth: 900,
    })
      .then(selectedImage => {
        console.log({selectedImage});
        let filename = selectedImage.path.split('/').pop();
        console.log({filename});
        this.uploadImage(selectedImage, filename);
      })
      .catch(err => {
        console.log(err);
      });
  };

  choosePicture = () => {
    ImagePicker.openPicker({
      width: 900,
      height: 1200,
      cropping: false,
    })
      .then(selectedImage => {
        console.log({selectedImage});
        let filename = selectedImage.path.split('/').pop();
        this.uploadImage(selectedImage, filename);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadImage = (file, name) => {
    console.log(file, name, 'file details');
    this.setState({
      uploadImageSuccessful: false,
      profileImageURI: file.path,
      imageUploading: true,
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginHorizontal: 15,
            padding: 10,
            borderRadius: 5,
            elevation: 1,
            backgroundColor: 'white',
            marginBottom: 15,
            marginTop: 15,
          }}>
          {this.state.profileImageURI ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ImageBackground
                blurRadius={
                  this.state.profileImageURI && this.state.uploadImageSuccessful
                    ? 0
                    : 0
                }
                source={{
                  uri: this.state.profileImageURI,
                }}
                style={[styles.imageBgCenter]}
                imageStyle={{
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              />
              {/* <Image
                source={{uri: this.state.profileImageURI}}
                style={{
                  // width: '100%',
                  height: 250,
                  marginHorizontal: 15,
                  resizeMode: 'contain',
                }}
              /> */}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Button
                type="outline"
                title="Take picture"
                onPress={() => this.requestCameraPermission('TAKE')}
                buttonStyle={{marginHorizontal: 25, marginBottom: 15}}
              />
              <Button
                title="Choose from gallery"
                onPress={() => this.requestCameraPermission('PICK')}
                buttonStyle={{marginHorizontal: 25}}
              />
            </View>
          )}
          {/* <MapView
            style={{height: 200, width: '100%', marginTop: 20}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          /> */}
          {!this.state.loading ? (
            <MapView
              style={{height: 200, width: '100%', marginTop: 20}}
              region={this.state.userLocation}>
              <Marker
                coordinate={{
                  latitude: this.state.userLocation.latitude,
                  longitude: this.state.userLocation.longitude,
                }}
                title="My location"
              />
            </MapView>
          ) : null}
          <View
            style={{
              paddingTop: 15,
              borderTopColor: ' rgba(0, 0, 0, 0.10)',
              borderTopWidth: StyleSheet.hairlineWidth,
            }}>
            <View style={styles.buttonContainer}>
              <Button
                title="Remove"
                type="outline"
                buttonStyle={styles.editPlanButton}
                containerStyle={{width: '30%', marginRight: 15}}
                titleStyle={{fontSize: 13}}
                onPress={() => this.setState({profileImageURI: null})}
                disabled={!this.state.profileImageURI}
              />
              <Button
                title="Continue"
                buttonStyle={styles.startJourneyButton}
                containerStyle={{flex: 1}}
                titleStyle={{fontSize: 13}}
                disabledStyle={{
                  backgroundColor: 'rgba(0,0,0,0.15)',
                }}
                disabledTitleStyle={{
                  color: 'rgba(0,0,0,0.25)',
                }}
                disabled={
                  !this.state.profileImageURI || this.state.userLocation == null
                }
                onPress={() => {
                  this.props.navigation.navigate('DetailsSubmitScreen', {
                    userLocation: this.state.userLocation,
                    imgUrl: this.state.profileImageURI,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: 'rgba(0,0,0,0.25)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imageBg: {
    backgroundColor: 'white',
    width: 100,
    // height: 200,
    justifyContent: 'flex-end',
    marginTop: 20, // was 20,
  },
  imageBgCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    // marginVertical: 15, // was 20,
  },
  editBtn: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 40,
    paddingBottom: 10,
  },
  editBtnText: {
    color: 'black',
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,.7)',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 5,
    top: 12,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 15,
    alignItems: 'center',
  },
});
