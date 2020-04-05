import React, { Component } from 'react'
import { 
    View,
    Text ,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { withCart } from "../utils/enhancers";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../constants/colors'

type ShippingCartIconProps = {
  item: any,
  id: string,
  btnStyle: any,
  isInWishlist: (item : any) => boolean,
  toWishlist: (item : any) => void,
  fromWishlist: (id : string) => void,
}

const styles = StyleSheet.create({
    wishlistBtn: {    
        // flex: 0.15,
        backgroundColor: 'white',
        // width: 50,
        // borderRadius: 8,
        // height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 0.8,
    }
})

const PriceReductionButton = ({
    onDiscard,
    onDone,
    item,
    done,
    btnStyle = {},
} : ShippingCartIconProps) => {
    return (
      <View style={{ alignItems:'center'}}>
          {
              !done
              ? <TouchableOpacity
              onPress={() => onDone(item)}
              style={[styles.wishlistBtn, btnStyle]}
            >
              <FontAwesome name="angle-double-down" size={20} />
            </TouchableOpacity>
              : <TouchableOpacity
                onPress={() => onDiscard(item)}
                style={[styles.wishlistBtn, btnStyle]}
                >
              <FontAwesome name="angle-double-down" size={20} color={colors.orange} />
            </TouchableOpacity>

          }
      </View>
    );
};

export default PriceReductionButton;