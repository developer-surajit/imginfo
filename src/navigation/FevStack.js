import {createStackNavigator} from 'react-navigation-stack';
import FevouriteListScreen from '../screens/FevouriteListScreen';

const FevStack = createStackNavigator(
  {
    FevouriteListScreen: {
      screen: FevouriteListScreen,
      navigationOptions: {
        // header: null,
        // title: 'Favourites',
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

export default FevStack;
