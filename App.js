/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import NavigationService from './src/navigation/NavigationService';
import AppNavigation from './src/navigation/rootNavigation';

import NetInfo from '@react-native-community/netinfo';
import {checkNetworkAction} from './src/redux/actions';
import {connect} from 'react-redux';

export class App extends React.Component {
  componentDidMount = () => {
    this.NetInfoEvent = NetInfo.addEventListener(state => {
      this.props.checkNetworkAction(state);
    });
  };

  componentWillUnmount() {
    this.NetInfoEvent();
  }

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

export default connect(
  null,
  {checkNetworkAction},
)(App);
