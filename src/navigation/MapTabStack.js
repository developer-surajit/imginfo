import {createStackNavigator} from 'react-navigation-stack';
// import SettingsScreen from '../screens/SettingsScreen';
import MapTabScreen from '../screens/MapTabScreen';
import ProductDeatilsScreen from './../screens/ProductDeatilsScreen';
const MapTabStack = createStackNavigator(
  {
    MapTabScreen: {
      screen: MapTabScreen,
      navigationOptions: {
        header: null,
        // title: 'Map',
      },
    },
    ProductDeatilsScreenAA: {
      screen: ProductDeatilsScreen,
      navigationOptions: {
        title: 'Product Details',
      },
    },
  },
  {
    // initialRouteName: 'OrdersScreen',
    navigationOptions: ({navigation}) => {
      let tabBarVisible = true;

      let routeName = navigation.state.routes[navigation.state.index].routeName;

      if (
        routeName == 'OrderDetailsScreen' ||
        routeName == 'ViewAddCommentsScreen'
      ) {
        tabBarVisible = false;
      }

      return {
        tabBarVisible,
      };
    },
  },
);

export default MapTabStack;
