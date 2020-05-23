import {createStackNavigator} from 'react-navigation-stack';
import SettingsScreen from '../screens/SettingsScreen';

const SettingsTabStack = createStackNavigator(
  {
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        // header: null,
        title: 'Settings',
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

export default SettingsTabStack;
