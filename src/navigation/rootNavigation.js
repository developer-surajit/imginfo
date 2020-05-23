import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthLoading from './AuthLoading';
import TabStack from './TabStack';
import AuthStack from './AuthStack';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: TabStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
