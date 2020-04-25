import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './../screens/HomeScreen';
import DetailsSubmitScreen from './../screens/DetailsSubmitScreen';
const AppStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    DetailsSubmitScreen: {
      screen: DetailsSubmitScreen,
    },
  },
  {
    // initialRouteName: 'CheckOutScreen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default AppStack;
