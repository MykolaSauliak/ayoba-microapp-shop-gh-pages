import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
// import AuthenticationStack from './AuthenticationStack';
import Profile from '../screens/Profile';
import Wishlist from '../screens/Profile/Wishlist';
import MyAddresses from '../screens/Profile/MyAddresses';
// import Favorites from '../screens/Favorites';
import MyOrders from '../screens/Profile/MyOrders';
import MyAlerts from '../screens/Profile/MyAlerts';
import MyItems from '../screens/Profile/MyItems';
import PriceOfferSent from '../screens/Profile/PriceOfferSent';
import AccountDetails from '../screens/Profile/AccountDetails';
import BackHeader from '../components/BackHeader';
import screens from '../constants/screens';
import Favorites from '../screens/Profile/Favorites';
import {AntDesign} from '@expo/vector-icons';

const ProfileStack = createStackNavigator(
  {
    [screens.Profile]:Profile,
    [screens.MyOrders]: {
      screen: MyOrders,
      navigationOptions: props => ({
        header: <BackHeader title="My orders" />,
        // header:  <BackHeader navigation={props.navigation} title="Sign in"/>,
      }),
    },
    [screens.MyAddresses]: {
      screen: MyAddresses,
      navigationOptions: props => ({
        header: <BackHeader title="Address" />,
        // header:  <BackHeader navigation={props.navigation} title="Sign in"/>,
      }),
    },
    [screens.Wishlist]: Wishlist,
    [screens.Favorites]: Favorites,
    [screens.MyAlerts]: MyAlerts,
    [screens.MyItems]: MyItems,
    [screens.AccountDetails]: AccountDetails,
    [screens.PriceOfferSent]: PriceOfferSent,
  },
  {
    defaultNavigationOptions: props => ({
      header: null,
    }),
    navigationOptions: {
      // title: i18n.t('tabs.profile'),
      title: 'Profile',
      tabBarIcon: ({focused, tintColor}) => {
        const iconName = focused ? 'meho' : 'meh';
        return <AntDesign name={iconName} size={25} color={tintColor} />;
      },
    },
  },
);

export default ProfileStack;
