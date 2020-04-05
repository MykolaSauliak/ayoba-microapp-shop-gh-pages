import React from 'react';
import {View, Text, FlatList, StatusBar, StyleSheet} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import ProductListItem from '../../components/ProductListItem';
import {isInWishlist} from '../../features/wishlist/selectors';
import {isInCart} from '../../features/cart/selectors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../../constants/styles';
import colors from '../../constants/colors';
import i18n from '../../i18n';
import {NavigationService} from '../../services';

const S = StyleSheet.create({
  header: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width:'100%',
    marginVertical: 10,
  },
});

const WishlistView = ({
  wishlist,
  cartItems,
  showEdit,
  setShowEdit,
  markedItems,

  toWishlist,
  fromWishlist,
  toCart,
  fromCart,
  openProductInfo,
  toggleItemMark,

  markedToWishlist,
  markedToCart,
  markedDelete,
}) => {
  const _renderHeader = (cart = false) => (
    <Header
      containerStyle={{backgroundColor: 'white'}}
      leftComponent={
        showEdit ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{paddingHorizontal: 5}}
              onPress={markedDelete}>
              <Icon name="delete" color="black" size={30} />
            </TouchableOpacity>
            {cart == false ? (
              <TouchableOpacity
                style={{paddingHorizontal: 5}}
                onPress={markedToCart}>
                <Icon name="shopping-cart" color="black" size={30} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{paddingHorizontal: 5}}
                onPress={markedToWishlist}>
                <Icon name="star" color="black" size={30} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          {
            icon: 'arrow-back',
            color: 'black',
            onPress: () => NavigationService.navigateToProfile(),
          }
        )
      }
      centerComponent={{
        text: 'Wishlist',
        style: {color: 'black', fontSize: 20},
      }}
      rightComponent={{
        text: showEdit ? 'done' : 'edit',
        color: 'black',
        onPress: () => setShowEdit(!showEdit),
      }}
    />
    // <View style={S.header}>
    //   <View
    //     style={{
    //       flex: 0.25,
    //       flexDirection: 'row',
    //       justifyContent: 'space-around',
    //     }}>
    //     {showEdit === true ? (
    //       <>
    //         <TouchableOpacity
    //           style={{paddingHorizontal: 5}}
    //           onPress={markedDelete}>
    //           <Icon name="delete" color="black" size={30} />
    //         </TouchableOpacity>
    //         {cart == false ? (
    //           <TouchableOpacity
    //             style={{paddingHorizontal: 5}}
    //             onPress={markedToCart}>
    //             <Icon name="shopping-cart" color="black" size={30} />
    //           </TouchableOpacity>
    //         ) : (
    //           <TouchableOpacity
    //             style={{paddingHorizontal: 5}}
    //             onPress={markedToWishlist}>
    //             <Icon name="star" color="black" size={30} />
    //           </TouchableOpacity>
    //         )}
    //       </>
    //     ) : (
    //       <TouchableOpacity>

    //       </TouchableOpacity>
    //     )}
    //   </View>
    //   <Text style={[globalStyles.text, {flex: 0.5, textAlign: 'center'}]}>
    //     {i18n.t('wishlist.mywishlist')}
    //   </Text>
    //   <View style={{flex: 0.25}}>
    //     {showEdit == false ? (
    //       <TouchableOpacity onPress={() => setShowEdit(true)}>
    //         <Text>{i18n.t('edit')}</Text>
    //       </TouchableOpacity>
    //     ) : (
    //       <TouchableOpacity onPress={() => setShowEdit(false)}>
    //         <Text>{i18n.t('done')}</Text>
    //       </TouchableOpacity>
    //     )}
    //   </View>
    // </View>
  );

  //console.log('wishlist',wishlist)
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar backgroundColor={colors.gray}/> */}
      {_renderHeader()}
      <FlatList
        keyExtractor={item => item.id + showEdit}
        data={wishlist}
        renderItem={({item}) => (
          <ProductListItem
            showCheckBox={showEdit}
            checked={
              markedItems.filter(i => i.id == item.id).length > 0 ? true : false
            }
            onCheckBoxClick={toggleItemMark}
            toWishlist={toWishlist}
            fromWishlist={fromWishlist}
            fromCart={fromCart}
            toCart={toCart}
            {...item}
            item={item}
            inWishlist={isInWishlist({wishlist, id: item.id})}
            inCart={isInCart({cartItems, id: item.id})}
            onPress={() => openProductInfo(item)}
          />
        )}
      />
    </View>
  );
};

export default WishlistView;
