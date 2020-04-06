import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import ClothesSearchHeader from '../components/ClothesSearchHeader';
import screens from '../constants/screens';
import colors from '../constants/colors';
import WomanSearch from '../screens/Search/CategorySearch/WomanSearch';
import LifestyleSearch from '../screens/Search/CategorySearch/LifestyleSearch';
import ManSearch from '../screens/Search/CategorySearch/ManSearch';
import {Ionicons} from '@expo/vector-icons'
import {defaultNavigationOptions} from './NavigationOptions';

const SearchTabs = createMaterialTopTabNavigator(
    {
      [screens.WomanSearch]: {
        screen: WomanSearch,
        navigationOptions: props => ({
          title: 'Woman',
        }),
      },
      [screens.ManSearch]: {
        screen: ManSearch,
        navigationOptions: props => ({
          title: 'Man',
        }),
      },
      [screens.LifestyleSearch]: {
        screen: LifestyleSearch,
        navigationOptions: props => ({
          title: 'Lifestyle',
        }),
      },
    },
    {
      defaultNavigationOptions: props => ({
        tabBarOptions: {
          style: {
            backgroundColor: colors.inputBackground,
          },
          tabStyle: {
            backgroundColor: colors.inputBackground,
          },
          indicatorStyle: {
            backgroundColor: 'black',
          },
          labelStyle: {
            color: 'black',
          },
          // activeTintColor: colors.inputBackground,
          // inactiveTintColor: colors.inputBackground,
        },
      }),
    },
  );

export default createStackNavigator({
    CategorySearchStack: {
        screen: SearchTabs,
        navigationOptions: ({navigation}) => ({
            header: ({navigation}) => (
                <ClothesSearchHeader
                onLeftButtonPress={() => NavigationService.navigateToHome()}
                onCartClick={() => navigation.navigate(screens.CartStack)}
                onSearchClick={() => navigation.navigate(screens.TextSearch)}
                />
            ),
            tabBarIcon: ({focused, tintColor}) => {
                const iconName = 'ios-search';
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
            title: 'Buy',
        }),
    }
    
},
  {
    defaultNavigationOptions,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        const iconName = 'ios-search';
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

