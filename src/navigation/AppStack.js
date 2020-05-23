import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './../screens/HomeScreen';
import DetailsSubmitScreen from './../screens/DetailsSubmitScreen';
import DashboardScreen from './../screens/DashboardScreen';
import RequestListScreen from './../screens/RequestListScreen';
import ProductDeatilsScreen from './../screens/ProductDeatilsScreen';
// import OutgoingRequestsTabScreen from './../screens/OutgoingRequestsTabScreen';
// import IncomingRequestsTabScreen from './../screens/IncomingRequestsTabScreen';
const AppStack = createStackNavigator(
  {
    DashboardScreen: {
      screen: DashboardScreen,
      navigationOptions: {
        // title: 'Product list',
        header: null,
      },
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Add Item',
      },
    },
    DetailsSubmitScreen: {
      screen: DetailsSubmitScreen,
      navigationOptions: {
        title: 'Submit Item',
      },
    },
    // RequestListScreen: {
    //   screen: RequestListScreen,
    // },
    ProductDeatilsScreen: {
      screen: ProductDeatilsScreen,
      navigationOptions: {
        title: 'Product Details',
      },
    },
    // OutgoingRequestsTabScreen: {
    //   screen: OutgoingRequestsTabScreen,
    // },
    // IncomingRequestsTabScreen: {
    //   screen: IncomingRequestsTabScreen,
    // },
  },
  {
    // initialRouteName: 'ProductDeatilsScreen',
    defaultNavigationOptions: {
      // header: null,
    },
    navigationOptions: ({navigation}) => {
      let tabBarVisible = true;

      let routeName = navigation.state.routes[navigation.state.index].routeName;

      if (
        routeName == 'HomeScreen' ||
        routeName == 'DetailsSubmitScreen' ||
        routeName == 'ProductDeatilsScreen'
      ) {
        tabBarVisible = false;
      }

      return {
        tabBarVisible,
      };
    },
  },
);

export default AppStack;
