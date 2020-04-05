import React, {useState, Suspense} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Mark, ProductCard} from '../../components';
import colors from '../../constants/colors';
import constants from '../../constants';
import globalStyles from '../../constants/styles';
import T from 'prop-types';
import i18n from '../../i18n';
import toTimestamp from '../../utils/getDiscountEndTs';
import {ListItem} from 'react-native-elements';
import styles from './ProductInfo.style.js';
import GallerySwiper from 'react-native-gallery-swiper';
import {
  DataTable,
  Chip
} from 'react-native-paper';
import {NavigationService} from '../../services';
import NameInputScreen from '../AuthenticationStack/NameInputScreen';
import Loading from '../../components/Loading'
import {
  AlertButton,
  WishlistButton,
  PriceReductionButton,
  CommentList,
  RecentlyViewed,
  HeaderWithCart,
  DiscoverMoreProducts
} from '../../containers'
import CommentListProvider from '../../containers/CommentListProvider';
import { Comment } from '../../types/Comment.type';
import { Product } from '../../types/types';
import FavoriteButton from '../../containers/FavoriteButton';

const waranty_icon = require('../../assets/images/waranty_icon.jpg');

type Props = {
  item: Product,
  similar_items: string[],
}

const ProductInfoView = ({
  item,
  historyItems,
  item: {
    similar_items,
    favorite_count = 0,
    images,
    photo1,
    brand_name = '',
    brand_id,
    category_name,
    category_id,
    type_name = '',
    type_id,
    subtype_name = '',
    subtype_id,

    photo2,
    // seller,
    id,
    warranty,
    title,
    color,
    material,
    printed,
    condition,

    description,
    price,
    currency,
    discount,
    discountEnd,
    discountEndTs,
    specs,
    similar_parts,
    universal,
    instock,
    we_love,
    vintage,
  },
  sellerInfo: {
    avatar, 
    name, 
    last_name, 
    email, 
    sold_item, 
    uid
  },
  isInCart,
  toCart,
  fromCart,

  imageModalVisible,
  setImageModalVisible,
  imageIndex,
  setImageIndex,

  toNegotiation,
  isUserFollowed,
  addToFollowing,
  removeFromFollowing,
  setLastUpdate,
  lastUpdate, 
  isSignedIn,
  onProductPress,
  discountCount = 13.30,
  purchaseOver = 150,
  discountCode = 'RFO11',
  AUTHENTICATION_FEES,

  getComments
} : Props) => {

  // let comments = getComments(id)

  if(!AUTHENTICATION_FEES){
    AUTHENTICATION_FEES = (price * 0.1).toFixed(2)
  }

  // let [lastUpdate, setLastUpdate] = React.useState();
  console.log('similar_items',similar_items)
  const imagesURI = images && images.map(i => ({uri: i.src}));
  // console.log('imagesURI',imagesURI)
  // console.log('render item')
  // console.log('images',images)
  // console.log('photo1',photo1)
  // let [headerSize, setHeaderSize] = useState();
  // let [scroll,setScroll] = useState(new Animated.Value(0));
  // const setHeaderSize = headerLayout => setHeaderSize({ headerLayout })

  const _renderSellerInfo = () => {
    return (
      <View style={[{ backgroundColor: 'white', paddingHorizontal, marginTop: 10, paddingVertical: 25}]}>
        <Text style={globalStyles.listTitle}>
          Seller
        </Text>
        {
          !uid
          ?<Text style={{textAlign:'center',marginVertical: 10}}>Can't fetch seller info</Text>
          :<ListItem
          onPress={() => {
            // console.log('navigate to user screen', uid);
            NavigationService.navigateToCustomUserProfile({user_id: uid});
          }}
          title={`${name} ${last_name}`}
          subtitle={`${sold_item || 0} sold items`}
          // rightElement={}
          rightAvatar={{
            source: {
              uri: avatar
                ? avatar
                : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            },
          }}
          rightElement={
            isUserFollowed({user_id: uid}) === false
            ? <TouchableOpacity onPress={() => addToFollowing(uid)}>
              <Text>+ Follow</Text>
            </TouchableOpacity>
            :<TouchableOpacity onPress={() => removeFromFollowing(uid)}>
              <Text>Unfollow</Text>
            </TouchableOpacity>
          }
        />}
      </View>
    );
  };

  const _renderRecentlyViewed = () => {
    return (
      <HorizontalItemList
        title="Recently Viewed"
        items={recently_viewed}
        renderItem={item => <ProductCard item={item} />}
      />
    );
  }

  // const renderForeground = () => {
  //     // const { scroll } = this.state
  //     const titleOpacity = scroll.interpolate({
  //       inputRange: [0, 106, 154],
  //       outputRange: [1, 1, 0],
  //       extrapolate: 'clamp'
  //     })
  // const translateY = scroll.interpolate({
  //     inputRange: [0, 100, 200],
  //     outputRange: [-50, -25,0],
  //   //   extrapolate: 'clamp'
  //   })
  //     return (
  //     //   <View style={styles.foreground}>
  //         <Animated.View style={{ opacity: titleOpacity,}}>
  //             <HeaderWithCart containerStyle={{...styles.headerWrapper, top: 0, height: 50, marginTop:0}}  title={title}/>
  //             <Text style={styles.message}>Text</Text>
  //         </Animated.View>
  //     //   </View>
  //     )
  //   }

  const renderHeader = () => {
    // const opacity = scroll.interpolate({
    //   inputRange: [0, 160, 210],
    //   outputRange: [0, 0, 1],
    //   extrapolate: 'clamp'
    // })

    return (
      //   <View style={styles.headerWrapper}>
      // <Animated.View style={{ opacity}}>
      <HeaderWithCart
        containerStyle={styles.headerWrapper}
        title={title}
        titleStyle={{color: 'black'}}
      />
      // </Animated.View>
      // </View>
    );
  };

  // console.log('image length',image.length)
  const getDiscountPrice = (price : number, discount : number) => {
    return (price * ((100 - discount) / 100)).toFixed(1);
  };

  const _renderBottomBtns = () => (
    <View style={styles.btnRow}>
      {/* {isInWishlist({id}) == true ? (
        <TouchableOpacity
          onPress={() => fromWishlist(id)}
          style={styles.wishlistBtn}>
          <AntDesign name="star" size={20} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => toWishlist(item)}
          style={styles.wishlistBtn}>
          <AntDesign name="staro" size={20} />
        </TouchableOpacity>
      )} */}
      <TouchableOpacity
        disabled={!isSignedIn}
        onPress={toNegotiation}
        style={[styles.cartBtn, {borderWidth: 1, backgroundColor: 'white'}]}>
        <Text style={[styles.buyBtn, {color: 'black'}]}>
          {isSignedIn ? i18n.t('product.makeanoffer') : 'Login to make an offer'}
        </Text>
      </TouchableOpacity>

      {isInCart({id}) == true ? (
        <TouchableOpacity
          onPress={() => fromCart(id)}
          style={[styles.cartBtn, {backgroundColor: 'gray'}]}>
          <Text style={styles.buyBtn}>{i18n.t('product.removefromcart')}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => toCart(id)} style={[styles.cartBtn]}>
          <Text style={styles.buyBtn}>{i18n.t('product.addtocart')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const paddingHorizontal = 15

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 0.8}}>
        {renderHeader()}
        <View style={{flex: 1, backgroundColor: colors.gray, paddingVertical: 15}}>
              <GallerySwiper
                images={imagesURI}
                style={{height: constants.DEVICE_HEIGHT * 0.5}}
                // Version *1.15.0 update
                // onEndReached={() => {
                //     // add more images when scroll reaches end
                // }}
                // Change this to render how many items before it.
                // initialNumToRender={2}
                // Turning this off will make it feel faster
                // and prevent the scroller to slow down
                // on fast swipes.
                sensitiveScroll={false}
              />
          <View style={{paddingBottom: 50}}>
            <View style={{marginBottom: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'flex-end',
                  paddingHorizontal:15,
                  // alignItems:'center'
                }}> 
                <FavoriteButton 
                  containerStyle={{padding: 5}}
                  item={item}
                  />
                {favorite_count > 0 && <Text style={styles.favoriteCount}>{favorite_count}</Text>}
              </View>

              <View style={{flex: 0.7, marginTop: 20, paddingHorizontal}}>
                {/* <SharedElement id="product_title"> */}
                  <Text style={[globalStyles.text, styles.productTitle]}>
                    {brand_name}
                  </Text>
                {/* </SharedElement> */}

                <Text style={globalStyles.desc}>{category_name}</Text>
                <Text style={globalStyles.desc}>
                  {type_name} {subtype_name}
                </Text>
                <View style={{alignItems:'flex-start'}}>
                  {we_love && <Chip >We love</Chip>}
                  {vintage &&<Chip>Vintage</Chip>}
                  {/* {we_love && <Mark fontSize={15} title="we love" />}
                  {vintage && <Mark fontSize={15} title="vintage" />} */}
                </View>
                {warranty > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Image
                      source={waranty_icon}
                      resizeMode="contain"
                      style={{width: 25, height: 25}}
                    />
                    <Text>
                      {i18n.t('product.waranty')} {warranty}{' '}
                      {i18n.t('product.months')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {/* <ScrollView horizontal style={{height: 100, width:"100%"}}> */}
            {/* {
                            (image && image.length > 0)
                            ? image.slice(1).map(( i,index ) => {
                                return <TouchableOpacity onPress={() => {
                                        setImageIndex(index+1)
                                        setImageModalVisible(true)}
                                        }>
                                        <Image resizeMode="contain" source={{ uri : i.src ? i.src : ''}} style={[styles.Image, {marginHorizontal:10, width:100}]}/>
                                </TouchableOpacity>
                            })
                            : null
                        } */}
            {/* </ScrollView> */}

            {/* <Text style={styles.title}>{title}</Text> */}
            <View
              style={[
                styles.itemDetailsBox,
                {backgroundColor: null, borderRadius: 10, marginVertical: 15,paddingHorizontal},
              ]}>
              {toTimestamp(discountEnd) > Date.now() / 1000 ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={[globalStyles.price, globalStyles.discountPrice]}>
                      {price} {constants.MONEY_SYMBOL}
                    </Text>
                    <Text style={globalStyles.discount}>- {discount} %</Text>
                  </View>
                  <Text style={[globalStyles.newPrice]}>
                    {getDiscountPrice(price, discount)} {constants.MONEY_SYMBOL}
                  </Text>
                </>
              ) : (
                <Text style={globalStyles.price}>
                  {price} {constants.MONEY_SYMBOL}
                </Text>
              )}
              <Text>+ {AUTHENTICATION_FEES} {constants.MONEY_SYMBOL} Authentication fees</Text>
              {/* <Text style={globalStyles.text}>{condition}</Text> */}
              {/* {instock == true ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name="done" color="green" size={25} />
                  <Text style={{color: 'green'}}>
                    {i18n.t('product.instock')}
                  </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name="done" color="gray" size={25} />
                  <Text style={{color: 'gray'}}>
                    {i18n.t('product.notinstock')}
                  </Text>
                </View>
              )} */}
              {/* {universal == true ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    name="settings-applications"
                    color="green"
                    size={25}
                  />
                  <Text style={{fontWeight: 'bold'}}>
                    {i18n.t('product.universalfit')}
                  </Text>
                </View>
              ) : null} */}
                <ListItem 
                  leftIcon={{name :'shield-check-outline', type: "material-community", color: "#f25d22", size: 35}}
                  containerStyle={{backgroundColor:null, marginVertical: 10}}
                  titleStyle={{color:'#f25d22'}} 
                  // onPress={() => {}}
                  title="Physical control and authentication by our experts"
                  />
                <View style={{marginVertical:25}}>
                  <Text style={{fontSize: 20}}>{condition}</Text>
                  <Text style={{fontSize: 20}}>{material}</Text>
                  <View style={{height: 1, borderWidth:0.5, marginVertical: 10, opacity:0.2}}/>
                  <Text style={{fontSize: 20}}>{description}</Text>
                </View>
            </View> 
            <View style={{flexDirection:'row', backgroundColor:'white',padding: 15, marginVertical: 15}}>
              <View style={{flex:1}}>
                  <PriceReductionButton item={item} />
              </View>
              <View style={{flex:1}}>
                  <WishlistButton item={item} />
              </View>
            </View>
            {/* item details */}
            <View style={[styles.itemDetailsBox, {marginHorizontal: paddingHorizontal}]}>
              <Text style={[styles.text, {marginVertical: 15}]}>
                {i18n.t('product.itemdetails')}
              </Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Title</DataTable.Title>
                  <DataTable.Title numeric>Value</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Color</DataTable.Cell>
                  <DataTable.Cell numeric>{color}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Material</DataTable.Cell>
                  <DataTable.Cell numeric>{material}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Printed</DataTable.Cell>
                  <DataTable.Cell numeric>{printed}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Condition</DataTable.Cell>
                  <DataTable.Cell numeric>{condition}</DataTable.Cell>
                </DataTable.Row>
                {/* <DataTable.Pagination
                                page={1}
                                numberOfPages={3}
                                onPageChange={(page) => { console.log(page); }}
                                label="1-2 of 6"
                                /> */}
              </DataTable>
              {/* {specs.map( (spec, i)=> {
                            console.log('spec - ',specs)
                            return(
                            <View style={{width: "100%", flexDirection:'row', paddingVertical: 4}}>
                                <View style={styles.tableCeil}>
                                    <Text style={{textAlign:'left'}}>{styles.title || styles.name || (specs.key ? specs.key.toUpperCase() : '') }</Text>
                                </View>
                                <View style={styles.tableCeil}>
                                    <Text style={{textAlign:'right'}}>{specs.value}</Text>
                                </View>
                            </View>
                            )
                })} */}
            </View>
            {/* <View style={[styles.itemDetailsBox, {marginVertical: 15}]}>
                        <Text style={[styles.text, {marginBottom: 15}]}>{i18n.t('product.similar_parts')}</Text>
                        {similar_parts.map( (s, i)=> {
                            //console.log('spec - ',s)
                            return(
                            <View style={{width: "100%", flexDirection:'row', paddingVertical: 4}}>
                                <View style={styles.tableCeil}>
                                    <Text style={{textAlign:'left'}}>{styles.company || styles.name || (styles.key ? styles.key.toUpperCase() : '') }</Text>
                                </View>
                                <View style={styles.tableCeil}>
                                    <Text style={{textAlign:'right'}}>{styles.title}</Text>
                                </View>
                            </View>
                            )
                        })}
                    </View> */}
            {_renderSellerInfo()}
            <CommentListProvider 
              id={id}
              collection="comments">
                  <CommentList 
                  id={id}
                  title="Comments"
                  // comments={comments}
                  containerStyle={{paddingHorizontal, paddingVertical: paddingHorizontal}}
                  />
            </CommentListProvider>



            <Suspense fallback={<Loading />}>
                <DiscoverMoreProducts
                    // key={'similar'}
                    // key={similar_items.join(', ')}
                    // key={lastUpdate}
                    collection="clothes"
                    onLoaded={() => setLastUpdate(Date.now())}
                    containerStyle={{paddingHorizontal}}
                    onPress={onProductPress}
                    product_ids={similar_items}
                    />  
            </Suspense>


            <RecentlyViewed 
                containerStyle={{paddingLeft: paddingHorizontal, paddingVertical: paddingHorizontal}}
                onPress={onProductPress}
                />
          </View>
        </View>
      </ScrollView>
      {_renderBottomBtns()}
    </>
  );
};

ProductInfoView.deafaultProps = {
  item: {},
  brand_name: '',
  type_name:'',
  subtype_name:'',
  condition: 'Good condition',
  price: 90,
  images: [],
  vintage: true,
  similar_items: [],
  specs: [
    {
      key: 'height',
      value: '90cm',
    },
  ],
  we_love: true,
  recently_viewed: [],
  seller: {
    image: {
      uri:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    },
    name: 'Georg',
    sold_item: 1,
  },
};

ProductInfoView.propTypes = {
  id: T.string,
};

export default ProductInfoView;
