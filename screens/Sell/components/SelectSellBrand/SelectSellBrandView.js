import React, {useState} from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import colors from '../../../../constants/colors';
import i18n from '../../../../i18n';
import S from './SelectSellBrand.style';
import {NavigationService} from '../../../../services';

const SelectSellBrandView = ({
  brands,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
}) => {
  let [searchText, setSearchText] = useState('');

  if (searchText && searchText.length > 0) {
    brands = brands.filter(
      b => b.title && b.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  let alpabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let DATA = [];
  alpabet.forEach(letter => {
    DATA.push({
      title: letter ? letter.toUpperCase() : letter,
      data: brands.filter(
        b => b.title && b.title.toLowerCase().startsWith(letter),
      ),
    });
  });
  // function onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  // }

  // let carmakes = []
  // cars.map( car => {
  //     if(carmakes.filter(c => c.title == car.carmake.trim()).length == 0){
  //         carmakes.push({
  //             title: car.carmake ? car.carmake.trim() : car.carmake,
  //             image : car.logo ? car.logo.src ? car.logo.src : '' : ''
  //         })
  //     }
  // })

  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <View style={{marginTop: 25}}>
        <Header
          leftComponent={{
            icon: 'arrowleft',
            type: 'antdesign',
            color: '#000',
            onPress: goBack,
          }}
          centerComponent={{
            text: 'Brands A-Z',
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
            padding: 15,
            fontSize: 22,
            marginVertical: 15,
            textAlign: 'center',
          }}>
          Can you tell us the brand ?
        </Text>
        {/* <ListItem /> */}
        <SearchBar
          onChangeText={text => setSearchText(text)}
          inputStyle={{borderWidth: null, borderColor: null}}
          containerStyle={{
            backgroundColor: 'white',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'gray',
          }}
          placeholder="Lookup all brands"
          value={searchText}
        />
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <ListItem
              onPress={() => onPress({brand: item})}
              bottomDivider
              title={item.title}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <ListItem containerStyle={S.header} bottomDivider title={title} />
          )}
        />
      </View>
    </View>
  );
};

SelectSellBrandView.defaultProps = {
  goBack: () => NavigationService.goBack(),
};

export default SelectSellBrandView;
