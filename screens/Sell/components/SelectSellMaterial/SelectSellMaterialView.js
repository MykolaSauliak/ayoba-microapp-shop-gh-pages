import React from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import colors from '../../../../constants/colors';
import constants from '../../../../constants';
import i18n from '../../../../i18n';
import S from './SelectSellMaterial.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';

const SelectSellMaterialView = ({
  materials,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  chooseMaterial,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      {/* <BottomSheet
                snapPoints = {[100, constants.DEVICE_HEIGHT]}
                renderContent = {this.renderContent}
                renderHeader = {this.renderHeader}
                /> */}
      <View style={{}}>
        <Header
          leftComponent={{
            icon: 'arrowleft',
            type: 'antdesign',
            color: '#000',
            onPress: goBack,
          }}
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}
          centerComponent={{
            text: 'Material',
            style: {fontSize: 18, color: '#000'},
          }}
          containerStyle={{
            height: 60,
            justifyContent: 'center',
            padding: 25,
            margin: 0,
            backgroundColor: 'white',
          }}
        />
        <Text
          style={{
            padding: 5,
            paddingHorizontal: 15,
            fontStyle: 'italic',
            fontSize: 15,
            marginVertical: 15,
            textAlign: 'left',
          }}>
          Specify the item's primary material
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {materials.map(m => (
            <ListItem
              bottomDivider
              title={m}
              onPress={() => chooseMaterial(m)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

SelectSellMaterialView.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellMaterialView;
