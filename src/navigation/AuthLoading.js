import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Animated,
  Easing,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const splash = require('../assets/images/splash.jpeg');
export default class AuthLoading extends React.Component {
  state = {
    isLoading: true,
  };
  componentDidMount = () => {
    // AsyncStorage.removeItem('user_id')
    setTimeout(() => this._bootstrapAsync(), 5000);
  };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async props => {
    // const user = await AsyncStorage.removeItem('user_id');
    const user = await AsyncStorage.getItem('user_id');

    console.log(user);

    // this.props.navigation.navigate('Auth');
    if (user) {
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ImageBackground source={splash} style={{flex: 1, width: '100%'}}>
            <View />
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
