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
import * as RNLocalize from 'react-native-localize';
import NetInfo from '@react-native-community/netinfo';
import {checkNetworkAction, setCurrentLanguage} from './src/redux/actions';
import {connect} from 'react-redux';
import I18n from './src/utils/I18n';
export class App extends React.Component {
  componentDidMount = () => {
    this.NetInfoEvent = NetInfo.addEventListener(state => {
      this.props.checkNetworkAction(state);
    });
    RNLocalize.addEventListener('change', () => {
      this.handleLocales();
    });
  };

  handleLocales = async () => {
    try {
      let locales = await RNLocalize.getLocales();
      console.log({locales});
      if (Array.isArray(locales)) {
        I18n.locale = locales[0].languageTag;
        I18n.defaultLocale = locales[0].languageTag;
        this.props.setCurrentLanguage(locales[0].languageTag);
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount() {
    this.NetInfoEvent();
    RNLocalize.removeEventListener('change');
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

export default connect(null, {checkNetworkAction, setCurrentLanguage})(App);
