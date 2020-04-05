import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import S from './styles';
import globalStyles from '../../../../constants/styles';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../../../constants/colors';
import {ListItem} from 'react-native-elements';
import {List, Checkbox} from 'react-native-paper';
import {NavigationService} from '../../../../services';
import constants from '../../../../constants';

const category_id = 'mskRjk1CHCvdWsURmmvz';

const LifestyleSearchView = ({
  subcategories,
  onPress,
  isModalVisible,
  setModalVisible,
  loading,
  types,
  subtypes,
  addToLastSearch,
}) => {
  // //console.log('categories length',subcategories.length);
  // console.log('subcategories length',subcategories.length);
  const _handlePress = () => {};

  const addLastSearchItem = item => {
    if (addToLastSearch) {
      addToLastSearch(item);
    }
  };

  // const _renderTypes = () => (

  // );

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        <View style={[S.listAccordion]}>
          <List.Accordion title="New in" titleStyle={{fontWeight: 'bold'}}>
            <TouchableOpacity
              onPress={
                () =>
                  search(
                    'New in',
                    {
                      refinementList: {
                        [constants.clothes_fields.category_id]: category_id,
                      },
                    },
                    constants.clothes,
                  )
                // NavigationService.navigateToSearchResult({
                //   title: 'All',
                //   options: {},
                // })
              }>
              <List.Item title="All" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () =>
                  search(
                    'Today',
                    {
                      refinementList: {
                        category_id: category_id,
                      },
                      range: {
                        [constants.clothes_fields.created_time]: {
                          min: Date.now() - constants.ONE_DAY_MILISECONDS,
                        },
                      },
                    },
                    constants.clothes,
                  )
                // NavigationService.navigateToSearchResult({
                //   title: 'Today',
                //   options: {},
                //   time: {createdAt: Date.now() - constants.ONE_DAY_MILISECONDS},
                // })
              }>
              <List.Item title="Today" />
            </TouchableOpacity>
          </List.Accordion>
        </View>

        {/* {_renderTypes()} */}

        <View style={S.listAccordion}>
          <TouchableOpacity
            onPress={
              () =>
                search(
                  'Express delivery',
                  {
                    refinementList: {
                      category_id: category_id,
                    },
                    toggle: {
                      [constants.clothes_fields.we_love]: true,
                    },
                  },
                  constants.clothes,
                )
              // NavigationService.navigateToSearchResult({
              //   title: 'We love',
              //   options: {
              //     category_id: category_id,
              //     tag_ids: ['fi5lSQlsw7ZQ6HTFgspJ'],
              //   },
              // })
            }>
            <List.Item titleStyle={{fontWeight: 'bold'}} title="We love" />
          </TouchableOpacity>
        </View>
        <View style={S.listAccordion}>
          <TouchableOpacity
            onPress={
              () =>
                search(
                  'Express delivery',
                  {
                    refinementList: {
                      category_id: category_id,
                    },
                    toggle: {
                      [constants.express_delivery]: true,
                    },
                  },
                  constants.clothes,
                )
              // NavigationService.navigateToSearchResult({
              //   title: 'Express delivery',
              //   options: {
              //     category_id: category_id,
              //     tag_ids: ['Bcw4GOJsS2wBlqiozlzy'],
              //   },
              // })
            }>
            <List.Item
              titleStyle={{fontWeight: 'bold'}}
              title="Express Delivery"
            />
          </TouchableOpacity>
        </View>
        {/*
              <List.Accordion
                title="Clothes"
                titleStyle={{fontWeight :'bold'}}
                // left={props => <List.Icon {...props} icon="folder" />}
                // expanded={true} //expanded
                // onPress={_handlePress}
              >
                <List.Item title="First item" />
                <List.Item title="Second item" />
              </List.Accordion> */}
        {/* </List.Section> */}
      </View>
    </ScrollView>
  );
};

export default LifestyleSearchView;
