import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import screens from '../constants/screens';
import {Notifications} from '../screens';
import {defaultNavigationOptions} from './NavigationOptions';
import NotificationIcon from '../containers/NotificationIcon';

export default createStackNavigator(
  {
    [screens.Notifications]: Notifications,
  },
  {
    initialRouteKey: screens.Notifications,
    headerMode: 'screen',
    defaultNavigationOptions: {
      ...defaultNavigationOptions,
      header: null,
    },
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        return <NotificationIcon focused={focused} color={tintColor} />;
      },
      title: 'Notifications',
      // title: i18n.t('tabs.buy'),
    },
  },
);
