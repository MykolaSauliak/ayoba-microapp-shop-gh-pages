import React from 'react';
import {createStackNavigator} from 'react-navigation';
import screens from '../constants/screens';
import {
  Home,
  ProductInfo
} from '../screens';
import {defaultNavigationOptions} from './NavigationOptions';
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default createStackNavigator(
  {
    [screens.HomeScreen]: Home,
    [screens.ProductInfo]: ProductInfo,
  },
  {
    initialRouteKey: screens.HomeScreen,
    headerMode: 'screen',
    defaultNavigationOptions,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        const iconName = focused ? 'home' : 'home-outline';
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={25}
            color={tintColor}
          />
        );
      },
      // title: i18n.t('tabs.home'),
      title: "Home",
      header: null,
    }
  },
);
