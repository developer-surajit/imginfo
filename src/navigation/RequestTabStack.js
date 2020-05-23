import {createStackNavigator} from 'react-navigation-stack';
import FevouriteListScreen from '../screens/FevouriteListScreen';
import RequestListScreen from '../screens/RequestListScreen';
import OutgoingRequestsTabScreen from './../screens/OutgoingRequestsTabScreen';
import IncomingRequestsTabScreen from './../screens/IncomingRequestsTabScreen';
const RequestTabStack = createStackNavigator(
  {
    RequestListScreen: {
      screen: RequestListScreen,
      navigationOptions: {
        header: null,
        // title: 'Requests',
      },
    },
    OutgoingRequestsTabScreen: {
      screen: OutgoingRequestsTabScreen,
    },
    IncomingRequestsTabScreen: {
      screen: IncomingRequestsTabScreen,
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

export default RequestTabStack;
