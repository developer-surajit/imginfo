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
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
const placeHolderImg = require('./../assets/images/placeholder-1.jpg');
import Colors from '../constants/Colors';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import {connect} from 'react-redux';
import requestCameraPermission from './../utils/requestCameraPermission';
// import { ScrollView } from 'react-native-gesture-handler';
const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class HomeScreen extends Component {
  state = {
    imageUploading: false,
    imageUploadParcentage: 0,
    uploadImageSuccessful: false,
    profileImageURI: null,
    permissionError: null,
    hasLocationPermission: false,
    userLocation: null,
    // loading: true,
    modalVisible: !true,
  };

  askPermissionAndTakeImage = async () => {
    try {
      let checkCameraPermission = await requestCameraPermission();
      if (checkCameraPermission.type == 'granted') {
        this.takePicture();
      }
    } catch (error) {
      console.log(error);
      if (error.type == 'error_CameraStorage_permission') {
        Alert.alert('Error', 'Please check for permission and try again', [
          {
            text: 'Try again',
            onPress: () => this.askPermissionAndTakeImage(),
          },
          {
            text: 'Cancel',
            // onPress: () => {
            //   BackHandler.exitApp();
            // },
            style: 'cancel',
          },
        ]);
      } else if (
        error.type == 'unavailable' ||
        error.type == 'denied' ||
        error.type == 'blocked'
      ) {
        Alert.alert(
          'Permission Denied',
          'Please enable Storage and camera permission and try again',
          [
            {
              text: 'Change permission',
              onPress: () => this.openSettings(),
            },
            {
              text: 'Cancel',
              // onPress: () => {
              //   BackHandler.exitApp();
              // },
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

  takePicture = () => {
    ImagePicker.openCamera({
      width: 600,
      height: 600,
      cropping: false,
      compressImageQuality: 0.3,
      compressImageMaxWidth: 600,
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

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
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

        {/* <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setModalVisible(false)}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 50,
              borderRadius: 10,
            }}>
            <Button
              type="clear"
              title="Take picture"
              onPress={() => {
                this.setModalVisible(false);
                setTimeout(() => this.requestCameraPermission('TAKE'), 500);
              }}
              buttonStyle={{marginHorizontal: 25, marginBottom: 15}}
            />
            <Button
              type="clear"
              title="Choose from gallery"
              onPress={() => {
                this.setModalVisible(false);
                setTimeout(() => this.requestCameraPermission('PICK'), 500);
              }}
              buttonStyle={{marginHorizontal: 25}}
            />
          </View>
        </Modal> */}

        <View
          style={{
            flex: 1,
            // justifyContent: 'space-between',
            marginHorizontal: 15,
            // padding: 10,
            borderRadius: 5,
            // elevation: 1,
            marginBottom: 15,
            marginTop: 15,
          }}>
          {this.state.profileImageURI ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri: this.state.profileImageURI,
                }}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: 200,
                  // marginHorizontal: 15,
                  resizeMode: 'cover',
                  margin: 15,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Image
                source={placeHolderImg}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: 250,
                  // marginHorizontal: 15,
                  resizeMode: 'contain',
                }}
              />
            </View>
          )}
          <Button
            buttonStyle={{
              borderRadius: 50,
              backgroundColor: Colors.main_color,
            }}
            containerStyle={{marginHorizontal: 20, marginTop: 15}}
            title="Take picture"
            onPress={() => this.askPermissionAndTakeImage()}
            // onPress={() => this.setState({modalVisible: true})}
            titleStyle={{color: 'white'}}
            // raised
          />

          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              height: 200,
              width: '100%',
              marginTop: 15,
            }}
            initialRegion={initialRegion}
            region={this.props.userLocation}>
            <Marker
              coordinate={this.props.userLocation}
              title="Tree location"
            />
          </MapView>

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
                title="Continue"
                onPress={() => {
                  this.props.navigation.navigate('DetailsSubmitScreen', {
                    userLocation: this.props.userLocation,
                    imgUrl: this.state.profileImageURI,
                  });
                }}
                titleStyle={{color: 'white'}}
                // raised
                disabled={
                  !this.state.profileImageURI || this.props.userLocation == null
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  // buttonContainer: {
  //   // flex: 1,
  //   flexDirection: 'row',
  //   // justifyContent: 'space-between',
  //   // paddingHorizontal: 15,
  //   alignItems: 'center',
  // },
});

const mapStateToProps = state => ({
  userLocation: state.userLocationReducer.userLocation,
  checkNetworkReducer: state.checkNetworkReducer,
  spinner: state.spinnerToggleReducers.spinner,
});

export default connect(mapStateToProps)(HomeScreen);
