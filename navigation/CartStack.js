import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Cart from '../screens/Cart';
import PaypalModal from '../screens/PaypalModal';
import Checkout from '../screens/Checkout';
// import StripePayment from '../screens/Checkout/components/PaymanentWebview/PaymanentWebview';
import ClothesSearchHeader from '../components/ClothesSearchHeader';
import BackHeader from '../components/BackHeader';
import screens from '../constants/screens';
import colors from '../constants/colors';
import {Ionicons} from '@expo/vector-icons'
import {defaultNavigationOptions} from './NavigationOptions';

const CartStack = createStackNavigator({
  [screens.Cart]: {
    screen: Cart,
    navigationOptions: {
      header: null,
    },
  },
  // [screens.PaypalModal]: {
  //   screen: PaypalModal,
  //   navigationOptions: {
  //     title: 'Paypal',
  //   },
  // },
  [screens.Checkout]: {
    screen: Checkout,
    navigationOptions: {
      title: 'Checkout',
    },
  },
  // [screens.StripePayment]: {
  //   screen: StripePayment,
  //   navigationOptions: {
  //     title: 'Pay',
  //   },
  // },
},{
    initialRouteKey: screens.Cart,
    headerMode: 'screen',
    defaultNavigationOptions,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        const iconName = focused ? 'home' : 'home-outline';
        return (
          <Ionicons
            name={iconName}
            size={25}
            color={tintColor}
          />
        );
      },
      // title: i18n.t('tabs.home'),
      title: "Buy",
      header: null,
    }
  }
);


export default CartStack;
