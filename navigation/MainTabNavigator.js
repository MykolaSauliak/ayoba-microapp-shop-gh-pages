import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import screens from '../constants/screens';

import {
  HomeStack,
  CategorySearchNavigation,
  SellNavigation,
  NotificationNavigator,
  ProfileNavigation
} from '../navigation'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const tabNavigator = createBottomTabNavigator({
    [screens.HomeStack]: HomeStack,
    [screens.CategorySearch]: CategorySearchNavigation,
    [screens.SellStack]: SellNavigation,
    [screens.NotificationStack]:NotificationNavigator,
    Profile: ProfileNavigation,
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
    },
    initialRouteName: screens.HomeStack,
  }
);

tabNavigator.path = '';

export default tabNavigator;
