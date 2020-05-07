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
    };

    this.map = React.createRef();
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

  requestOwner = () => {
    console.log(this.state, 'state');
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

  render() {
    // if (this.state.loading) {
    //   return (
    //     // <View>
    //     //   <Text>Loading</Text>
    //     // </View>
    //     <Spinner
    //       textContent="Loading.."
    //       visible={this.state.loading}
    //       overlayColor="rgba(0,0,0,0.5)"
    //       textStyle={{color: 'white'}}
    //     />
    //   );
    // }

    // let property_type = 'public';
    // average_rating;

    // if (this.state.productData && !!!property_type) {
    //   property_type = 'public';
    // } else {
    //   property_type = this.state.productData.property_type;
    // }

    // let images = [`https://iodroid.in/redfrugten/uploads/${product_image}`];

    // multiple_image.array.forEach(element => {

    // });

    console.log('state', this.state);

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          {!this.state.loading ? (
            <View style={{flexBasis: 250}}>
              <ImageSlider
                loopBothSides
                autoPlayWithInterval={3000}
                images={this.state.imageArray}
                customSlide={({index, item, style, width}) => (
                  // It's important to put style here because it's got offset inside
                  <View
                    key={index}
                    style={[style, styles.customSlide, styles.slider]}>
                    <Image
                      source={{uri: item}}
                      style={[styles.customImage, {resizeMode: 'cover'}]}
                    />
                  </View>
                )}
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
                  resizeMode: 'cover',
                  borderRadius: 4,
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <Icon
              name="image-plus"
              type="material-community"
              color="#777"
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
              <Text
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
              </Text>
              <AirbnbRating
                count={5}
                defaultRating={this.state.rating}
                size={20}
                showRating={false}
                onFinishRating={e => {
                  this.submitRating(e);
                }}
              />
            </View>
          </View>
          {!this.state.loading ? (
            <View style={{marginTop: 10, paddingHorizontal: 15}}>
              {!isEmpty(this.state.productData) ? (
                <Text>
                  Property type :{' '}
                  {!isEmpty(this.state.productData)
                    ? this.state.productData.property_type
                    : 'public'}
                </Text>
              ) : null}
              {this.state.productData ? (
                <MapView
                  ref={this.map}
                  style={{height: 200, width: '100%', marginTop: 10}}
                  initialRegion={initialRegion}
                  region={this.state.region}>
                  <Marker
                    coordinate={this.state.region}
                    title="Tree location"
                  />
                </MapView>
              ) : null}
            </View>
          ) : (
            <View>
              <MapView
                style={{height: 200, width: '100%', marginTop: 10}}
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
                paddingVertical: 10,
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
    height: Dimensions.get('window').width,
  },
});

const mapStateToProps = state => ({
  checkNetworkReducer: state.checkNetworkReducer,
  userLocation: state.userLocationReducer.userLocation,
});

export default connect(mapStateToProps)(ProductDeatilsScreen);
