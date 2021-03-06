import React from 'react';
import {View, Text, FlatList, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'react-native-elements';
import ProductListItem from '../../components/ProductListItem';
import ErrorBoundary from '../../components/ErrorBoundary';
import NotSignedIn from '../../components/NotSignedIn';
import DraftListItem from '../../components/DraftListItem';
import {isInWishlist} from '../../features/wishlist/selectors';
import {isInCart} from '../../features/cart/selectors';
import globalStyles from '../../constants/styles';
import colors from '../../constants/colors';
import i18n from '../../i18n';
import getStepRemained from '../../utils/getStepRemained';
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

const SellView = ({
  wishlist,
  drafts,
  cartItems,
  showEdit,
  setShowEdit,
  markedItems,
  isSignedIn,
  // toWishlist,
  // fromWishlist,
  // toCart,
  fromDrafts,
  openDraftInfo,
  toggleItemMark,

  markedToWishlist,
  markedToCart,
  markedDelete,
  openAddItemScreen,
}) => {
  // console.log('isSignedIn', isSignedIn);
  const _renderHeader = (cart = false) => (
    <View style={S.header}>
      <View
        style={{
          flex: 0.25,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {showEdit === true && (
          <>
            <TouchableOpacity
              style={{paddingHorizontal: 5}}
              onPress={markedDelete}>
              <Icon name="delete" color="black" size={30} />
            </TouchableOpacity>
            {/* {
                                cart == false
                                ? <TouchableOpacity  style={{paddingHorizontal: 5}} onPress={markedToCart}>
                                    <Icon name="shopping-cart" color="black" size={30}/>
                                </TouchableOpacity>
                                :  <TouchableOpacity  style={{paddingHorizontal: 5}} onPress={markedToWishlist}>
                                <Icon name="star" color="black" size={30}/>
                            </TouchableOpacity>
                            } */}
          </>
        )}
      </View>
      <Text style={[globalStyles.text, {flex: 0.5, textAlign: 'center'}]}>
        {'Drafts'}{' '}
      </Text>
      {/* <Text style={[globalStyles.text, {flex: 0.5, textAlign:'center'}]}>{ i18n.t('wishlist.mywishlist')}</Text> */}
      <View style={{flex: 0.25}}>
        {showEdit == false ? (
          <TouchableOpacity onPress={() => setShowEdit(true)}>
            <Text>{i18n.t('edit')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowEdit(false)}>
            <Text>{i18n.t('done')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // if (!isSignedIn) {
  //   return <NotSignedIn onPress={() => NavigationService.navigateToAuth()} />;
  // }
  //console.log('wishlist',wishlist)
  return (
    <ErrorBoundary>
      <View style={{flex: 1}}>
        <View style={{position: 'absolute', right: 15, bottom: 15, zIndex: 2}}>
          <TouchableOpacity onPress={openAddItemScreen}>
            <AntDesign name="pluscircle" size={50} />
          </TouchableOpacity>
        </View>
        {/* <StatusBar backgroundColor={colors.gray}/> */}
        {_renderHeader()}
        <FlatList
          keyExtractor={item => item.id + showEdit}
          data={drafts}
          renderItem={({item}) => (
            <DraftListItem
              steps={getStepRemained(item)}
              showCheckBox={showEdit}
              checked={
                markedItems.filter(i => i.id == item.id).length > 0
                  ? true
                  : false
              }
              onCheckBoxClick={toggleItemMark}
              // toWishlist={toWishlist}
              // fromWishlist={fromWishlist}
              // fromCart={fromCart}
              // toCart={toCart}
              {...item}
              item={item}
              // inWishlist={isInWishlist({wishlist, id: item.id})}
              // inCart={isInCart({cartItems, id: item.id})}
              onPress={() => openDraftInfo(item)}
            />
          )}
        />
      </View>
    </ErrorBoundary>
  );
};

export default SellView;
