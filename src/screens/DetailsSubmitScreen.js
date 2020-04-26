import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
  ToastAndroid,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {universalApiCall} from './../utils/universalApiCall';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../constants/Colors';
class DetailsSubmitScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null,
      imgUrl: null,
      comment: '',
      userId: null,
      loading: true,
    };
  }

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

  createFormData = photo => {
    const data = new FormData();
    data.append('photo', {
      name: photo.split('/').pop(),
      uri: Platform.OS === 'android' ? photo : photo.replace('file://', ''),
      type: 'image/jpeg',
    });

    console.log(data, 'imgData');

    return data;
  };

  submitDetails = async () => {
    // let imgData = this.createFormData(this.state.imgUrl);
    try {
      let {userLocation, imgUrl, userId, comment} = this.state;
      if (!!!comment) {
        ToastAndroid.show('Please enter comment', 1500);
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
      submitData.append('desc', comment);
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
        ToastAndroid.show('Image uploaded successfully', 1500);
        this.props.navigation.popToTop();
      }

      console.log(data, 'submit data');
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error, 'error in submit');
    }
  };

  render() {
    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="always">
        <Spinner
          textContent="Loading.."
          visible={this.state.loading}
          overlayColor="rgba(0,0,0,0.5)"
          textStyle={{color: 'white'}}
        />
        {this.state.imgUrl ? (
          <Image
            source={{uri: this.state.imgUrl}}
            style={{
              // width: '100%',
              height: 250,
              marginHorizontal: 15,
              borderRadius: 4,
              overflow: 'hidden',
              resizeMode: 'contain',
              marginTop: 50,
            }}
          />
        ) : null}
        <Text
          style={{
            marginBottom: 10,
            fontSize: 16,
            marginHorizontal: 15,
            marginTop: 20,
            color: '#333',
          }}>
          Description
        </Text>
        <View>
          <Input
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: 'rgba(0,0,255,0.05)',
              marginTop: 10,
              paddingHorizontal: 10,
              marginHorizontal: 5,
            }}
            value={this.state.comment}
            placeholder="Comment"
            multiline
            textAlignVertical="top"
            numberOfLines={4}
            inputStyle={{
              fontSize: 14,
            }}
            onChangeText={text => this.setState({comment: text})}
          />
        </View>
        <Button
          buttonStyle={{
            borderRadius: 50,
            backgroundColor: Colors.main_color,
          }}
          containerStyle={{marginHorizontal: 20, marginTop: 25}}
          title="Submit"
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

export default DetailsSubmitScreen;
