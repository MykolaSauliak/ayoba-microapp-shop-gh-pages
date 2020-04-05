import React from 'react';
import {ActivityIndicator} from 'react-native';
import colors from '../constants/colors';

const Loading = () => {
  return <ActivityIndicator size="large" color={colors.gray} />;
};

export default Loading;
