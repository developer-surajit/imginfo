import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens/RegisterScreen';

const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,
    },
  },
}, {
  // initialRouteName: 'RegisterScreen',
});

export default AuthStack;
