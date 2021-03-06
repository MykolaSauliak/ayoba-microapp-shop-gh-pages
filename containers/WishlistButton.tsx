import React, { Component } from 'react'
import { 
    View,
    Text ,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { withWishlist } from "../utils/enhancers";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../constants/colors'

type WishlistButtonProps = {
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
        // backgroundColor: 'white',
        // width: 50,
        // borderRadius: 8,
        // height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 0.8,
    },
    btnText: {
      fontSize: 14,
      marginTop: 10,
    }
})

const WishlistButton = ({
    toWishlist,
    fromWishlist,
    isInWishlist,
    item = {},
    btnStyle = {},
} : WishlistButtonProps) => {
    return (
      <View style={{justifyContent:'space-around', backgroundColor: null}}>
        {isInWishlist(item) == true ? (
            <TouchableOpacity
              onPress={() => fromWishlist(item.id)}
              style={[styles.wishlistBtn, btnStyle]}
            >
              <AntDesign name="star" size={30} color='black' />
              <Text style={styles.btnText}>Wishlist</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => toWishlist(item)}
              style={[styles.wishlistBtn, btnStyle]}
                >
              <AntDesign name="staro" size={30} />
              <Text style={[styles.btnText, {opacity: 0.5}]}>Wishlist</Text>
            </TouchableOpacity>
        )}
      </View>
    );
};

export default withWishlist()(WishlistButton);