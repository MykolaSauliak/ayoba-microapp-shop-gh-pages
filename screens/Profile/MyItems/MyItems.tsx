import React from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
// import globalStyles from '../../constants/styles';
import colors from '../../../constants/colors';
// import i18n from '../../i18n';
import GridList from '../../../containers/GridList'
import BackHeader from "../../../components/BackHeader";
import Loading from "../../../components/Loading";

const S = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: colors.dark,
  },
});

const MyItems = ({
  items = [],
  loading
}) => {

  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeader title="My Items"/>
      <GridList loading={loading} LoadingComponent={Loading} items={items} />
    </View>
  );
};

export default MyItems;
