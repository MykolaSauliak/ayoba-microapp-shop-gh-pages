
import React from 'react';
import { 
    TouchableOpacity,
    View,
    Text
 } from 'react-native';
 import { AntDesign } from '@expo/vector-icons';

const PlusComponent = ({
    onPress,
    containerStyle = {}
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{alignItems:'center', justifyContent:'center', borderColor:'#75b4e0', borderWidth:0.5, borderRadius: 10, width: '100%', height: 50}, containerStyle]}>
            <AntDesign name={'plus'} size={30}/>
        </TouchableOpacity>
    );
};

export default PlusComponent;