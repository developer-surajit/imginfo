import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './../screens/HomeScreen';
import DetailsSubmitScreen from './../screens/DetailsSubmitScreen';
import DashboardScreen from './../screens/DashboardScreen';
import RequestListScreen from './../screens/RequestListScreen';
import ProductDeatilsScreen from './../screens/ProductDeatilsScreen';
import OutgoingRequestsTabScreen from './../screens/OutgoingRequestsTabScreen';
import IncomingRequestsTabScreen from './../screens/IncomingRequestsTabScreen';
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
    RequestListScreen: {
      screen: RequestListScreen,
    },
    ProductDeatilsScreen: {
      screen: ProductDeatilsScreen,
    },
    OutgoingRequestsTabScreen: {
      screen: OutgoingRequestsTabScreen,
    },
    IncomingRequestsTabScreen: {
      screen: IncomingRequestsTabScreen,
    },
  },
  {
    // initialRouteName: 'ProductDeatilsScreen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default AppStack;
