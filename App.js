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

import AppNavigation from './src/navigation/rootNavigation'
export class App extends React.Component  {
render (){
  return (
    <AppNavigation />
  )
}
};

export default App;
