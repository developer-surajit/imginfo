import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {universalApiCall} from './../utils/universalApiCall';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../constants/Colors';
import {StackActions, NavigationActions} from 'react-navigation';
import {toastAndroidiOS} from '../utils/toastAndroidiOS';
import {getProductListForMapAction} from '../redux/actions';
import I18n from '../utils/I18n';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
var radio_props = [
  {label: 'Public', value: 'public'},
  {label: 'Private', value: 'private'},
];
import {connect} from 'react-redux';
class DetailsSubmitScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null,
      imgUrl: null,
      comment: '',
      userId: null,
      loading: true,
      property_type: 'public',
    };
  }
  static navigationOptions = () => ({
    headerTitle: I18n.t('Submit_Item'),
  });

  componentDidMount = async () => {
    let userLocation = this.props.navigation.getParam('userLocation');
    let imgUrl = this.props.navigation.getParam('imgUrl');
    let userId = await AsyncStorage.getItem('user_id');
    this.setState({
      userLocation,
      imgUrl,
      userId: JSON.parse(userId),
      loading: false,
    });
    console.log(userLocation, imgUrl, userId);

    // this.createFormData(imgUrl);
  };

  // createFormData = photo => {
  //   const data = new FormData();
  //   data.append('photo', {
  //     name: photo.split('/').pop(),
  //     uri: Platform.OS === 'android' ? photo : photo.replace('file://', ''),
  //     type: 'image/jpeg',
  //   });

  //   console.log(data, 'imgData');

  //   return data;
  // };

  submitDetails = async () => {
    // let imgData = this.createFormData(this.state.imgUrl);
    try {
      let {userLocation, imgUrl, userId, comment, property_type} = this.state;
      if (!!!comment) {
        toastAndroidiOS('Please enter comment', 1500);
        return;
      }
      this.setState({
        loading: true,
      });
      let submitData = new FormData();

      const uriPart = imgUrl.split('.').pop();
      // const fileExtension = uriPart[uriPart.length - 1];
      const imgName = imgUrl.split('/').pop();

      submitData.append('user_id', userId);
      submitData.append('property_type', property_type);
      submitData.append('desc', comment);
      // submitData.append('lat', '23.171292');
      // submitData.append('lon', '87.865407');
      submitData.append('lat', userLocation.latitude);
      submitData.append('lon', userLocation.longitude);
      submitData.append('image', {
        name: imgName,
        uri: Platform.OS === 'android' ? imgUrl : imgUrl.replace('file://', ''),
        type: `image/${uriPart}`,
      });

      console.log({submitData});

      let data = await universalApiCall(
        '/addpointlocation',
        'POST',
        submitData,
        {
          'Content-Type': 'multipart/form-data',
        },
      );

      if (data.data.status) {
        this.setState({
          loading: false,
        });
        toastAndroidiOS(I18n.t('Image_uploaded_successfully'), 1500);
        this.props.getProductListForMapAction({
          redius: 200,
          lat: userLocation.latitude,
          lon: userLocation.longitude,
        });
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            // NavigationActions.navigate({routeName: 'HomeScreen'}),
            NavigationActions.navigate({routeName: 'DashboardScreen'}),
          ],
        });
        this.props.navigation.dispatch(resetAction);
        // this.props.navigation.push('HomeScreen');
      } else {
        toastAndroidiOS(I18n.t('something_wrong'), 1500);
      }

      console.log(data, 'submit data');
    } catch (error) {
      toastAndroidiOS(I18n.t('something_wrong'), 1500);
      this.setState({
        loading: false,
      });
      console.log(error, 'error in submit');
    }
  };

  render() {
    // let radio_props =
    //   storeData.delivery_type == 'both'
    //     ? [{label: 'Pickup', value: 0}, {label: 'Home Delivery', value: 1}]
    //     : storeData.delivery_type === 'pickup'
    //     ? [{label: 'Pickup', value: 0}]
    //     : [{label: 'Home Delivery', value: 0}];
    console.log(this.state, 'state in submit');
    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="always">
        <Spinner
          textContent={I18n.t('Loading')}
          visible={this.state.loading}
          overlayColor="rgba(0,0,0,0.5)"
          textStyle={{color: 'white'}}
        />
        {this.state.imgUrl ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginHorizontal: 15,
            }}>
            <Image
              source={{uri: this.state.imgUrl}}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 4,
                overflow: 'hidden',
                resizeMode: 'cover',
                marginTop: 30,
              }}
            />
          </View>
        ) : null}
        <Text
          style={{
            marginBottom: 10,
            fontSize: 16,
            marginHorizontal: 15,
            marginTop: 20,
            color: '#333',
          }}>
          {I18n.t('Description')}
        </Text>
        <View>
          <Input
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: 'rgba(0,0,255,0.05)',
              marginTop: 10,
              paddingHorizontal: 10,
              marginHorizontal: 5,
              marginBottom: 15,
            }}
            value={this.state.comment}
            placeholder={I18n.t('Comment')}
            multiline
            textAlignVertical="top"
            numberOfLines={4}
            inputStyle={{
              fontSize: 14,
            }}
            onChangeText={text => this.setState({comment: text})}
          />
        </View>

        <View style={{paddingHorizontal: 15}}>
          <Text style={{marginBottom: 10}}>{I18n.t('Property_type')}</Text>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            buttonSize={14}
            buttonColor={Colors.main_color}
            selectedButtonColor={Colors.main_color}
            animation={!true}
            onPress={value => {
              this.setState({property_type: value});
            }}
          />
        </View>

        <Button
          buttonStyle={{
            borderRadius: 50,
            backgroundColor: Colors.main_color,
          }}
          containerStyle={{marginHorizontal: 20, marginTop: 25}}
          title={I18n.t('Submit')}
          onPress={this.submitDetails}
          titleStyle={{color: 'white'}}
          disabled={!this.state.comment}
        />
        {/* <Button
          title="Submit"
          buttonStyle={{marginHorizontal: 15, marginTop: 25}}
          containerStyle={{flex: 1}}
          titleStyle={{fontSize: 13}}
          disabledStyle={{
            backgroundColor: 'rgba(0,0,0,0.15)',
          }}
          disabledTitleStyle={{
            color: 'rgba(0,0,0,0.25)',
          }}
          // disabled={
          //   !this.state.profileImageURI || this.state.userLocation == null
          // }
          onPress={this.submitDetails}
        /> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageBgCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    // marginVertical: 15, // was 20,
  },
});
const mapStateToProps = state => ({
  currentLanguage: state.currentLanguageReducer.currentLanguage,
});

export default connect(mapStateToProps, {
  getProductListForMapAction,
})(DetailsSubmitScreen);
