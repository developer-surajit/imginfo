/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {MenuProvider} from 'react-native-popup-menu';
import NavigationService from './src/navigation/NavigationService';
import AppNavigation from './src/navigation/rootNavigation';
export class App extends React.Component {
  render() {
    return (
      <MenuProvider>
        <AppNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </MenuProvider>
    );
  }
}

export default App;
