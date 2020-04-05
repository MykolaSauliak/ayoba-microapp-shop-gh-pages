import React from 'react';
import { 
    View,
    Text
 } from "react-native";
import { ListItem } from "react-native-elements";
import globalStyles from '../constants/styles';

const ItemList = ({
    items,
    onItemClick
}) => {
    return (
        <View style={{padding: 10}}>
            {items.map(( l, i) => (
                <ListItem 
                    contentContainerStyle={globalStyles.listItem}
                    onPress={() => onItemClick(l)}
                    key={i}
                    leftAvatar={{ source: { uri: l.avatar_url } }}
                    title={l.name}
                    subtitle={l.subtitle}
                    bottomDivider
                />
            ))}
        </View>
    );
};

export default ItemList;