/**
 * @format
 */

// import 'react-native-gesture-handler';
import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store/configureStore';
import React, {Component} from 'react';

const store = configureStore();
YellowBox.ignoreWarnings(['Warning:']);

class AppWithStore extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppWithStore);
