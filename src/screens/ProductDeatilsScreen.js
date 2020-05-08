import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ToastAndroid,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import getDirections from 'react-native-google-maps-directions';
import {Rating, Icon, AirbnbRating, Button} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {universalApiCall} from '../utils/universalApiCall';
import isEmpty from '../utils/isEmpty';
import Spinner from 'react-native-loading-spinner-overlay';
import requestCameraPermission from './../utils/requestCameraPermission';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
const placeHolderImg = require('./../assets/images/placeholder-1.jpg');
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
import {convertDistance, getDistance} from 'geolib';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import Carousel, {Pagination} from 'react-native-snap-carousel';
const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class ProductDeatilsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userLocation: null,
      region: null,
      showDatePicker: false,
      showTimePicker: false,
      requestDate: new Date(),
      requestTime: new Date(),
      productData: null,
      imageUploading: false,
      imageUploadParcentage: 0,
      uploadImageSuccessful: false,
      profileImageURI: null,
      ready: true,
      rating: 0,
      imageArray: [],
      activeIndex: 0,
      distance: null,
    };

    this.map = React.createRef();
    this.c = React.createRef();
  }

  componentDidMount = async () => {
    let product_id = this.props.navigation.getParam('product_id');
    let user_id = await AsyncStorage.getItem('user_id');

    this.setState(
      {
        product_id,
        user_id: JSON.parse(user_id),
      },
      () => this.getProductDetails(),
    );
    // console.log(product_id, JSON.parse(user_id), 'product id, user id');
    // console.log('moment', moment().format('YYYY-MM-DD HH:MM:SS'));
  };

  getDistanceMeter = region => {
    return getDistance(this.props.userLocation, region);
    // console.log(
    //   geolib.convertDistance(
    //     getDistance(this.props.userLocation, region || this.state.region),
    //   ),
    //   'km',
    // );
    // console.log(convertDistance(1000), 'm');
  };

  getProductDetails = async () => {
    try {
      this.setState({
        loading: true,
      });

      let data = await universalApiCall(
        '/listmultipleproductimagebyproduct',
        'POST',
        {
          product_id: this.state.product_id,
        },
      );

      if (data.data.status) {
        let region = {
          latitude: JSON.parse(data.data.result[0].lat),
          longitude: JSON.parse(data.data.result[0].lon),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        this.setState({
          distance: this.getDistanceMeter(region),
          loading: false,
          productData: data.data.result[0],
          region: region,
          imageArray: this.getImageArray([
            {image: data.data.result[0].product_image},
            ...data.data.result[0].multiple_image,
          ]),
        });

        // this.setRegion(region);
      }

      console.log(data.data.result[0], 'product details');
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error, error.response, 'in product details get data');
    }
  };

  // setRegion = region => {
  //   console.log(this.map);
  //   setTimeout(() => this.map.current.mapview.animateToRegion(region), 10);
  //   // if (this.state.ready) {
  //   // }
  //   //this.setState({ region });
  // };

  getImageArray = arr => {
    let retArr = [];

    arr.forEach(elm => {
      retArr.push(`https://iodroid.in/redfrugten/uploads/${elm.image}`);
    });

    return retArr;
  };

  handleGetDirections = () => {
    let {region} = this.state;
    const data = {
      source: {
        ...this.props.userLocation,
      },
      destination: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
      ],
    };
    getDirections(data);
  };

  requestOwner = async () => {
    console.log(this.state, 'dddddddd');
    try {
      let {user_id, product_id} = this.state;

      let dateTime = `${moment().format('YYYY-MM-DD')} ${moment().format(
        'HH:MM:SS',
      )}`;
      console.log(dateTime, 'dateTime');
      let submitData = {
        user_id,
        product_id,
        date_time: dateTime,
        status: 0,
        transfer_status: 'Send',
      };

      let data = await universalApiCall(
        '/addrequestbyuser',
        'POST',
        submitData,
      );
      console.log(data, 'request data');

      if (data.data.status) {
        // this.getProductDetails();
        // this.setState({
        //   loading: false,
        // });
        ToastAndroid.show('request successfully', 1500);
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error, 'error in submit');
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
        this.uploadImage(selectedImage.path, filename);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadImage = async (file, name) => {
    console.log(file, name, 'file details');
    try {
      let {user_id, product_id} = this.state;
      this.setState({
        loading: true,
        imageUploading: true,
        uploadImageSuccessful: false,
      });
      let submitData = new FormData();

      const imgExtention = name.split('.').pop();
      const imgName = file.split('/').pop();

      submitData.append('user_id', user_id);
      submitData.append('product_id', product_id);
      submitData.append('date_time', moment().format('YYYY-MM-DD HH:MM:SS'));
      submitData.append('image', {
        name: imgName,
        uri: Platform.OS === 'android' ? file : file.replace('file://', ''),
        type: `image/${imgExtention}`,
      });

      console.log({submitData});

      let data = await universalApiCall(
        '/addmultipleproductimagebyuser',
        'POST',
        submitData,
        {
          'Content-Type': 'multipart/form-data',
        },
      );

      if (data.data.status) {
        this.getProductDetails();
        // this.setState({
        //   loading: false,
        // });
        ToastAndroid.show('Image uploaded successfully', 1500);
      }

      console.log(data, 'submit data');
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error, 'error in submit');
    }
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

  submitRating = async rating => {
    console.log('Rating is: ' + rating);
    try {
      // this.setState({
      //   loading: true,
      // });

      let data = await universalApiCall('/addratingbyuser', 'POST', {
        product_id: this.state.product_id,
        user_id: this.state.user_id,
        rating: rating,
      });

      // this.setState({
      //   loading: false,
      // });

      if (data.data.status) {
        ToastAndroid.show('Your rating is successful!!', 1500);
      }

      console.log(data, 'rating');
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error, error.response, 'in rating get data');
    }
  };

  _renderItem({item, index}) {
    return (
      <View
        style={{
          elevation: 5,
          marginHorizontal: 10,
          marginVertical: 15,
          borderRadius: 10,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: item}}
          style={[{width: '100%', height: 300}, {resizeMode: 'cover'}]}
        />
      </View>
    );
  }

  render() {
    console.log('state', this.state.distance);
    // this.getDistanceMeter();

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          {!this.state.loading ? (
            // <View style={{flexBasis: 250}}>
            //   <ImageSlider
            //     loopBothSides
            //     autoPlayWithInterval={3000}
            //     images={this.state.imageArray}
            //     customSlide={({index, item, style, width}) => (
            //       // It's important to put style here because it's got offset inside
            //       <View
            //         key={index}
            //         style={[style, styles.customSlide, styles.slider]}>
            //         <Image
            //           source={{uri: item}}
            //           style={[styles.customImage, {resizeMode: 'cover'}]}
            //         />
            //       </View>
            //     )}
            //   />
            // </View>
            <View style={{flex: 1}}>
              <Carousel
                layout={'default'}
                layoutCardOffset={18}
                ref={this.c}
                data={this.state.imageArray}
                sliderWidth={WIDTH}
                itemWidth={WIDTH - 100}
                renderItem={this._renderItem}
                onSnapToItem={index => this.setState({activeIndex: index})}
              />
              {/* <Pagination
                carouselRef={this.c}
                dotsLength={this.state.imageArray.length}
                activeDotIndex={this.state.activeIndex}
                containerStyle={{backgroundColor: 'white'}}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
                inactiveDotStyle={
                  {
                    // Define styles for inactive dots here
                  }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              /> */}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 15,
                elevation: 5,
              }}>
              <Image
                source={placeHolderImg}
                resizeMode="contain"
                style={{
                  width: WIDTH - 100,
                  height: 300,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
              {!this.state.loading ? (
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 15,
                    paddingLeft: 5,
                  }}>
                  No image found
                </Text>
              ) : null}
            </View>
          )}
          <Spinner
            textContent="Loading.."
            visible={this.state.loading}
            overlayColor="rgba(0,0,0,0.5)"
            textStyle={{color: 'white'}}
          />
          {!this.state.loading &&
          !isNaN(this.state.distance) &&
          this.state.distance - 100 < 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingVertical: 15,
                // borderBottomWidth: 1,
                // borderTopWidth: 1,
                // borderColor: Colors.light_grey,
                backgroundColor: Colors.main_color,
                elevation: 2,
                marginHorizontal: 15,
                borderRadius: 10,
              }}>
              <Icon
                name="image-plus"
                type="material-community"
                color="white"
                onPress={this.askPermissionAndTakeImage}
              />
              <View
                style={
                  {
                    // flexDirection: 'row',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }
                }>
                {/* <Text
                style={{
                  textAlign: 'right',
                  marginHorizontal: 5,
                  marginBottom: 5,
                }}>
                {' '}
                Average Rating:{' '}
                {this.state.productData && this.state.productData.rating
                  ? this.state.productData.rating
                  : '0'}
              </Text> */}
                <AirbnbRating
                  count={5}
                  defaultRating={this.state.rating}
                  size={20}
                  showRating={false}
                  onFinishRating={e => {
                    Alert.alert('Are you sure', 'You want to rate this item?', [
                      {
                        text: 'Yes',
                        onPress: () => this.submitRating(e),
                      },
                      {
                        text: 'Cancel',
                        onPress: () => {
                          console.log('cancel');
                          this.setState({rating: 0});
                        },
                        style: 'cancel',
                      },
                    ]);
                    // this.submitRating(e);
                  }}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
                backgroundColor: Colors.main_color_light_0,
                elevation: 2,
                marginHorizontal: 15,
                borderRadius: 10,
              }}>
              <Text style={{color: Colors.dark_grey_2, textAlign: 'center'}}>
                You're not within 100 meter radius from the product
              </Text>
            </View>
          )}
          {!this.state.loading ? (
            <View
              style={{
                marginTop: 20,
                marginHorizontal: 15,
                backgroundColor: 'white',
                elevation: 5,
              }}>
              {!isEmpty(this.state.productData) ? (
                <Text
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 16,
                    textAlign: 'center',
                    paddingVertical: 10,
                  }}>
                  Property type :{' '}
                  {!isEmpty(this.state.productData)
                    ? this.state.productData.property_type
                    : 'public'}
                </Text>
              ) : null}
              {this.state.productData ? (
                <View
                  style={
                    {
                      // borderRadius: 5,
                      // overflow: 'hidden',
                      // marginTop: 10,
                      // marginBottom: 20,
                    }
                  }>
                  <MapView
                    ref={this.map}
                    style={{
                      height: 250,
                      width: '100%',
                    }}
                    initialRegion={initialRegion}
                    region={this.state.region}>
                    <Marker
                      coordinate={this.state.region}
                      title="Tree location"
                    />
                  </MapView>
                </View>
              ) : null}
            </View>
          ) : (
            <View
              style={{
                marginTop: 20,
                marginHorizontal: 15,
                backgroundColor: 'white',
                elevation: 5,
              }}>
              <MapView
                style={{height: 250, width: '100%'}}
                initialRegion={this.props.userLocation}
              />
            </View>
          )}

          {!this.state.loading ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent:
                  this.state.productData &&
                  this.state.productData.property_type == 'private'
                    ? 'space-between'
                    : 'center',
                alignItems: 'center',
                paddingHorizontal: 15,
                marginVertical: 20,
              }}>
              <Button
                buttonStyle={styles.btnStyle}
                title="Navigate"
                onPress={() => {
                  this.handleGetDirections();
                }}
                titleStyle={{color: 'white'}}
              />
              {this.state.productData &&
              this.state.productData.property_type == 'private' ? (
                <Button
                  buttonStyle={styles.btnStyle}
                  title="Request Owner"
                  onPress={() => {
                    this.setState({
                      showDatePicker: true,
                    });
                  }}
                  titleStyle={{color: 'white'}}
                />
              ) : null}
            </View>
          ) : null}

          {this.state.showDatePicker && (
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={this.state.requestDate}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={(event, selectedDate) => {
                console.log('requestDate', selectedDate, event);
                this.setState({
                  requestDate:
                    event.type == 'dismissed'
                      ? this.state.requestDate
                      : selectedDate,
                  showTimePicker: true,
                  showDatePicker: false,
                });
              }}
            />
          )}
          {this.state.showTimePicker && (
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={this.state.requestTime}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={(event, selectedTime) => {
                console.log('requestTime', selectedTime);
                this.setState(
                  {
                    requestTime:
                      event.type == 'dismissed'
                        ? this.state.requestTime
                        : selectedTime,
                    showTimePicker: false,
                  },
                  () => {
                    event.type !== 'dismissed' && this.requestOwner();
                  },
                );
              }}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    borderRadius: 50,
    backgroundColor: Colors.main_color,
    width: Dimensions.get('window').width / 2 - 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  slider: {backgroundColor: '#000', height: 250},
  content1: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content2: {
    width: '100%',
    height: 100,
    marginTop: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {color: '#fff'},
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: {
    opacity: 1,
    color: 'red',
  },
  customSlide: {
    height: 250,
    // backgroundColor: 'green',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  customImage: {
    width: '100%',
    height: 300,
  },
});

const mapStateToProps = state => ({
  checkNetworkReducer: state.checkNetworkReducer,
  userLocation: state.userLocationReducer.userLocation,
});

export default connect(mapStateToProps)(ProductDeatilsScreen);
