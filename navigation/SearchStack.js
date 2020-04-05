import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import WomanSearch from '../screens/Search/CategorySearch/WomanSearch';
import LifestyleSearch from '../screens/Search/CategorySearch/LifestyleSearch';
import ManSearch from '../screens/Search/CategorySearch/ManSearch';
// import CategorySearch from '../screens/CategorySearch';
import ListScreen from '../screens/Search/ListScreen';
import TextSearch from '../screens/Search/TextSearch';
import SearchHistory from '../screens/Search/SearchHistory';
import ClothesSearchHeader from '../containers/ClothesSearchHeader';
import BackHeader from '../components/BackHeader';
import screens from '../constants/screens';
import colors from '../constants/colors';
import {defaultNavigationOptions} from './NavigationOptions';

const SearchStack = createStackNavigator(
  {
    [screens.TextSearch]: TextSearch,
    [screens.SearchHistory]: SearchHistory,
    [screens.ListScreen]: ListScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default SearchStack;
