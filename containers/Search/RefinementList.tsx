import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { ListItem } from "react-native-elements";
import { NavigationService } from "../../services"
import FilterRow from '../../components/FilterRow';
import FacetModal from '../../components/FacetModal';
import {InstantSearch, Configure,connectRefinementList,connectCurrentRefinements } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/reactnative';
import config from '../../config';
import constants from '../../constants'
import BackHeader from '../../components/BackHeader'
import R from 'ramda';
const searchClient = algoliasearch(
  config.ALGOLIA_APP_ID,
  config.ALGOLIA_SEARCH_ID,
);

import {withSearch} from '../../utils/enhancers'
import { setSearchState } from '../../features/search/actions';
import { FlatList } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
  },
  list: {
    marginTop: 20,
  },
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  itemCount: {
    backgroundColor: '#252b33',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 7.5,
  },
  itemCountText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  filterTitle : {
    fontSize :18
  },
  filterContainer : {
      padding : 10,
      height: 65,
      borderBottomColor : 'black',
      backgroundColor : 'white'
  },
});

const RefinementList = ({
  items, 
  refine,
  attribute,
  title,
  subtitle,
  currentRefinement,
  // searchClient,
  searchState,
  // lastSearchUpdate,
  // onSearchStateChange,
  ...otherProps
}) => {

  console.log('RefinementList searchState',searchState)
  const getCurrentRefinement = () => {
    return R.path(['refinementList',attribute,0],searchState) || ''
  }
  
  if(!items || items.length < 1){
    return null
  }
  
  return (
     <FilterRow 
          title={title}
          subtitle={subtitle}
          // rightElement={<Text>{currentRefinement?.join(', ')}</Text>}
          rightElement={<Text>{getCurrentRefinement()}</Text>}
          onPress={() => NavigationService.navigateToList({
            title, 
            items,
            onItemPress : (item) => { 
                  refine(item.value)
                  NavigationService.goBack()
              }
          })} 
        />
  )
}

const ItemPropType = PropTypes.shape({
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  isRefined: PropTypes.bool.isRequired,
});

RefinementList.propTypes = {
  items: PropTypes.arrayOf(ItemPropType).isRequired,
  refine: PropTypes.func.isRequired,
};

export default withSearch()(connectRefinementList(RefinementList))
