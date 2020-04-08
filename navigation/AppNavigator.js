import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBrowserApp } from '@react-navigation/web';
import MainTabNavigator from './MainTabNavigator';
import screens from '../constants/screens';
import SearchStack from './SearchStack';
// import SearchResultStack from './SearchResultStack';
import UserProfileStack from './UserProfileStack';
import CartStack from './CartStack';
import NegotiationNavigator from './NegotiationNavigator';
import FilterSort from './FilterSortNavigation';
import AddShippingAddressScreen from '../screens/AddShippingAddressScreen';
import AuthNavigator from './AuthNavigator';

const switchNavigator = createStackNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    [screens.MainStack]: MainTabNavigator,
    // [screens.ListScreen]: ListScreen,
    [screens.UserProfileStack]: UserProfileStack,
    [screens.AddShippingAddressScreen]: AddShippingAddressScreen,
    [screens.SearchStack]: SearchStack,
    // [screens.SearchResultStack]: SearchResultStack,
    [screens.FilterSort]: FilterSort,
    [screens.AuthStack]: AuthNavigator,
    [screens.NegotiationsStack]: NegotiationNavigator,
    [screens.CartStack]: CartStack,
  },
  {
    defaultNavigationOptions: props => ({
      header: null,
    }),
    navigationOptions: {
      header: null
    }
  },
);

switchNavigator.path = '';

export default createAppContainer(switchNavigator, {history: 'hash'});