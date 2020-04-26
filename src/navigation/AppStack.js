import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './../screens/HomeScreen';
import DetailsSubmitScreen from './../screens/DetailsSubmitScreen';
import DashboardScreen from './../screens/DashboardScreen';
const AppStack = createStackNavigator(
  {
    DashboardScreen: {
      screen: DashboardScreen,
    },
    HomeScreen: {
      screen: HomeScreen,
    },
    DetailsSubmitScreen: {
      screen: DetailsSubmitScreen,
    },
  },
  {
    // initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default AppStack;
