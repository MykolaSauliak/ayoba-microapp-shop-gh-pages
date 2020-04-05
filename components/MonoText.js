import React from 'react';
import {
    Text
} from 'react-native';
import globalStyles from '../constants/styles';

const MonoText = ({
    text
}) => {
    return (
        <Text style={globalStyles.typedText}>{text}</Text>
    );
};

export default MonoText;