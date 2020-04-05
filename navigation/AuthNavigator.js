import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Auth from '../screens/Auth/AuthScreenContainer';
import ClothesSearchHeader from '../containers/ClothesSearchHeader';
import BackHeader from '../components/BackHeader';
import screens from '../constants/screens';
import colors from '../constants/colors';

const AuthStack = createStackNavigator({
  [screens.Auth]: {
    screen: Auth,
    navigationOptions: {
      header: null,
    },
  },
});

export default AuthStack;
