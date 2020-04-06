import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

const NotSignedIn = ({onPress}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>To unlock all features please: </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{color: colors.orange}}>log in/register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

NotSignedIn.default = {
  onPress: () => {},
};

export default NotSignedIn;
