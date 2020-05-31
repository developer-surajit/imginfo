import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FevStack from './FevStack';
import RequestTabStack from './RequestTabStack';
import Colors from '../constants/Colors';
import AppStack from './AppStack';
// import MapTabScreen from '../screens/MapTabScreen';
import SettingsTabStack from './SettingsTabStack';
import MapTabStack from './MapTabStack';
import I18n from '../utils/I18n';
const TabBarComponent = props => <BottomTabBar {...props} />;

export default createBottomTabNavigator(
  {
    AppStack: {
      screen: AppStack,
      path: 'app',
      navigationOptions: {
        title: `${I18n.t('List')}`,
        // tabBarVisible: false,
      },
    },
    RequestTabStack: {
      screen: RequestTabStack,
      navigationOptions: {
        title: 'Request',
      },
    },
    MapTabStack: {
      screen: MapTabStack,
      navigationOptions: {
        title: 'Map',
      },
    },
    FevStack: {
      screen: FevStack,
      navigationOptions: {
        title: 'Favourite',
      },
    },
    SettingsTabStack: {
      screen: SettingsTabStack,
      navigationOptions: {
        title: 'Setting',
      },
    },
  },
  {
    tabBarComponent: props => (
      <TabBarComponent
        {...props}
        style={{
          paddingVertical: 5,
          height: 55,
          backgroundColor: Colors.main_color_light_0,
        }}
      />
    ),
    initialRouteName: 'MapTabStack',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = FontAwesome;
        let iconName;
        if (routeName === 'AppStack') {
          iconName = 'home';
        } else if (routeName === 'RequestTabStack') {
          iconName = 'exchange';
        } else if (routeName === 'MapTabStack') {
          iconName = 'map';
        } else if (routeName === 'FevStack') {
          iconName = 'heart';
        } else {
          IconComponent = FontAwesome;
          iconName = 'gear';
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={20} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.main_color,
      inactiveTintColor: Colors.light_grey,
    },
  },
);
