import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import colors from '../../../../constants/colors';
import i18n from '../../../../i18n';

const SelectSellInformationView = ({
  categories,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
}) => {
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
            text: 'Submit item',
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
          In which category should you place your article
        </Text>
        {/* <ListItem /> */}
        <FlatList
          data={categories}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              titleStyle={{textAlign: 'center'}}
              onPress={() => onPress(item)}
              // leftAvatar={{ source: { uri: item.image } }}
              bottomDivider
            />
          )}
        />
      </View>
    </View>
  );
};

export default SelectSellInformationView;
