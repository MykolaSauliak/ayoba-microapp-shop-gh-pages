 import * as firebase from 'firebase';
 import 'firebase/firestore';
import { Alert } from "react-native";
import R from 'ramda';
import _ from 'lodash';
import constants from '../constants'
import moment from 'moment';
import Ayoba from './Ayoba';

const collectionsNames = {
  negotiations : "negotiations",
}


interface  ShopServiceInterface {
    init : (store : any) => void
}

class ShopService implements ShopServiceInterface {
  _store = null;

  init(store){
    if(this._store){
      return
    }

    this._store = store
    const settings = {
      persistence: true,
      cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    };
    firebase.firestore().settings(settings)
  }

  // constructor() {

  // }
  async addToken(token : string){
    // const user = firebase.auth().currentUser;
    // if(!user || !user.uid){
    //   return 
    // }
    let user  = {
      uid :  Ayoba.getUserPhone() || "tst"
    }

    if(!token){
      console.log('token is required')
    }
    let response = await firebase.firestore().collection('stripe_customers')
                .doc(user.uid)
                .collection('tokens').add({token: token})
    
  }

  async fetchPopulaBrands(){
    let brands = []
    try{
        const snapshot = await firebase.firestore().collection('brands').where('popular','==',true).limit(10).get()
        snapshot.forEach((doc) => {
          brands.push(doc.data());
            // //console.log(doc.data())
         });
    }catch(err){
        console.log('fetchPopularBrands err',err)
        // Alert.alert()
    }finally{
        return brands
    }
  }

  async fetchUser(user_id: string){
    let user = {}
    if(!user_id){
      return null
    }
    try{
        const doc = await firebase.firestore().collection('users').doc(user_id).get()
        if(doc.exists){
          user = doc.data()
        }
    }catch(err){
        console.log('fetchUser err',err)
        // Alert.alert()
    }finally{
        return user
    }
  }

  async updateUserInfo(update: any){
    // const user = firebase.auth().currentUser;
    let succesfull = false
    // if(!user || !user.uid){
    //   return 
    // }
    let user  = {
      uid :  Ayoba.getUserPhone() || "tst"
    }
    if(!update){
      return 
    }

    try{
        const response = await firebase.firestore().collection('users').doc(user.uid).update({...update})
        succesfull = true
    }catch(err){
        succesfull = false
        console.log('updateUserInfo err',err)
    }finally{
        return succesfull
    }
  }

  async fetchItemsForSale(user_id  :string, createdAt : string){
    let items = []
    try{
        let query = firebase.firestore().collection('clothes')
              .where(constants.clothes_fields.user_id,'==',user_id)
              .where(constants.clothes_fields.isApproved,'==',true)
              .where(constants.clothes_fields.sold,'==',false)
        if(createdAt){
            query = query.orderBy(createdAt).startAt(createdAt)
        }
        const snapshot = await query
                              .get()

        snapshot.forEach((doc) => {
          items.push(doc.data());
            // //console.log(doc.data())
         });
    }catch(err){  
        //console.log('err',err)
        // Alert.alert()
    }finally{
      console.log('wishlist',items.length)
        return items
    }
  }

  async fetchSoldCount(user_id  :string){
    let count = 0
    try{
      let query = firebase.firestore().collection('clothes')
            .where(constants.clothes_fields.user_id,'==',user_id)
            .where(constants.clothes_fields.isApproved,'==',true)
            .where(constants.clothes_fields.sold,'==',true)
        const snapshot = await query
                              .get()
        count = snapshot.size;
    }catch(err){  
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return count
    }
  }

  async fetchWishlist(user_id  :string){
    console.log('fetchWishlist')
    let wishlist = []
    try{
        const doc = await firebase.firestore().collection('wishlists')
                              .doc(user_id)
                              .get()
        if(doc.exists){
          let wishlistKeys = doc.data()
          let promises = []
          Object.entries(wishlistKeys).forEach(([key,value]: [string,boolean]) => {
            if(value == true){
              promises.push(this.getGood(key))
            }
          })  
          wishlist = await Promise.all(promises)
        }

    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
      console.log('wishlist',wishlist.length)
        return wishlist
    }
  }

  async addToWishlist(id : string){
    // const user = firebase.auth().currentUser;
    // if(!user || !user.uid){
    //   return
    // }
    let user  = {
      uid :  Ayoba.getUserPhone() || "tst"
    }
    let succesfull = false
    try{
        const response = await firebase.firestore().collection('wishlists')
                              .doc(user.uid)
                              .set({
                                [id]:true
                              }, {merge: true})
        // if(doc.exists){
        //   following = doc.data()
        // }
        succesfull=true
            // //console.log(doc.data())
    }catch(err){
        console.log('addToWishlist',err)
        // Alert.alert()
    }finally{
        return succesfull
    }
  }
  

  async removeFromWishlist(id : string){
      // const user = firebase.auth().currentUser;
      // if(!user || !user.uid){
      //   return
      // }
      let user = {
      }
      try{
        let phone = Ayoba.getUserPhone() || ""
        user.uid = phone
      }catch(err){
        user.uid = 'tst'
      }
      let succesfull = false
      try{
          const response = await firebase.firestore().collection('wishlists')
                                .doc(user.uid)
                                .set({
                                  [id]:false
                                }, {merge: true})
          // if(doc.exists){
          //   following = doc.data()
          // }
          succesfull=true
              // //console.log(doc.data())
      }catch(err){
          console.log('removeFromWishlist',err)
          // Alert.alert()
      }finally{
          return succesfull
      }
  }

  async fetchFavorites(user_id : string){
    let favorites=[]
    try{
        const doc = await firebase.firestore().collection('favorites')
                              .doc(user_id)
                              .get()
        if(doc.exists){
          let favoritesKeys = doc.data()
          let promises = []
          Object.entries(favoritesKeys).forEach(([key,value]: [string,boolean]) => {
            if(value == true){
              promises.push(this.getGood(key))
            }
          })  
          favorites = await Promise.all(promises)
        }

    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
      // console.log('favorites',favorites.length)
        return favorites
    }
  }
  
  async addToFavorites(id : string){
    // const user = firebase.auth().currentUser;
    // if(!user || !user.uid){
    //   return
    // }
    let user  = {
      uid :  Ayoba.getUserPhone() || "tst"
    }
    let succesfull = false
    try{
        const response = await firebase.firestore().collection('favorites')
                              .doc(user.uid)
                              .set({
                                [id]:true
                              }, {merge: true})

        await firebase.firestore().collection('clothes')
                              .doc(id)
                              .update({
                                favorite_count : firestore.FieldValue.increment(1)
                              })
                        
        // if(doc.exists){
        //   following = doc.data()
        // }
        succesfull=true
            // //console.log(doc.data())
    }catch(err){
        console.log('ERROR addToFavorites',err)
        // Alert.alert()
    }finally{
        return succesfull
    }
  }

  async removeFromFavorites(id : string){
      // const user = firebase.auth().currentUser;
      // if(!user || !user.uid){
      //   return
      // }
      let user = {
      }
      try{
        let phone = Ayoba.getUserPhone() || ""
        user.uid = phone
      }catch(err){
        user.uid = 'tst'
      }
      let succesfull = false
      try{
          const response = await firebase.firestore().collection('favorites')
                                .doc(user.uid)
                                .set({
                                  [id]:false
                                }, {merge: true})
          await firebase.firestore().collection('clothes')
            .doc(id)
            .update({
              favorite_count : firestore.FieldValue.increment(-1)
            })
          // if(doc.exists){
          //   following = doc.data()
          // }
          succesfull=true
              // //console.log(doc.data())
      }catch(err){
          console.log('ERROR removeFromFavorites',err)
          // Alert.alert()
      }finally{
          return succesfull
      }
  }


  /** Followers and followed */
  async addFollowing(followed_user_id : string){
    // const user = firebase.auth().currentUser;
    // if(!user || !user.uid){
    //   return
    // }
    let user  = {
      uid :  Ayoba.getUserPhone() || "tst"
    }
    let succesfull = false
    try{
        await firebase.firestore().collection('following')
                              .doc(user.uid)
                              .set({
                                [followed_user_id]:true
                              }, {merge: true})
        await firebase.firestore().collection('followers')
                              .doc(followed_user_id)
                              .set({
                                [user.uid]:true
                              }, {merge: true})
        // if(doc.exists){
        //   following = doc.data()
        // }
        succesfull=true
            // //console.log(doc.data())
    }catch(err){
        console.log('addFollowing',err)
        // Alert.alert()
    }finally{
        return succesfull
    }
  }

  async removeFollowing(followed_user_id){
      // const user = firebase.auth().currentUser;
      // if(!user || !user.uid){
      //   return
      // }
      let user = {
      }
      try{
        let phone = Ayoba.getUserPhone() || ""
        user.uid = phone
      }catch(err){
        user.uid = 'tst'
      }
      let succesfull = false
      try{
        await firebase.firestore().collection('following')
                              .doc(user.uid)
                              .set({
                                [followed_user_id]:false
                              }, {merge: true})
        await firebase.firestore().collection('followers')
                              .doc(followed_user_id)
                              .set({
                                [user.uid]:false
                              }, {merge: true})
          // if(doc.exists){
          //   following = doc.data()
          // }
          succesfull=true
              // //console.log(doc.data())
      }catch(err){
          console.log('addFollowing',err)
          // Alert.alert()
      }finally{
          return succesfull
      }
  }

  async fetchFollowing(user_id){
    let following = {}
    try{
        const doc = await firebase.firestore().collection('following')
                              .doc(user_id)
                              .get()
        if(doc.exists){
          following = doc.data()
        }
            // //console.log(doc.data())
    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return following
    }
  }

  async fetchFollowedBy(user_id){
    let followers = {}
    try{
        const doc = await firebase.firestore().collection('followers')
                            .doc(user_id)
                            .get()
        if(doc.exists){
          followers = doc.data()
        }
            // //console.log(doc.data())
    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return followers
    }
  }

  async getCategories(){
    let categories=[]
    try{
        const snapshot = await firebase.firestore().collection('categories').get()
        snapshot.forEach((doc) => {
            categories.push(doc.data());
            // //console.log(doc.data())
         });
    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return categories
    }
    // snapshot.
  }

  async getMyItems() {
   // if()
   let items = [];
   let count = null;
   let user  = {
    uid :  Ayoba.getUserPhone() || "tst"
  }
  //  let user = firebase.auth().currentUser
  //  if(!user.uid){
  //    return 
  //  }

   try{
     let snapshot;
     let query = firebase.firestore().collection('clothes').where('user_id','==',user.uid)
     // console.log('query',query)  
     snapshot = await query.orderBy('createdAt', "desc").get()
     count  = snapshot.size
     // .where("specs.B6", isEqualTo: true)
     // .whereField("vitamins.C", isEqualTo: true)
     snapshot.forEach(s => {
      items.push(s.data())
     })
   }catch(err){
     console.log('error during fetching goods', err)
   }
   finally {
     console.log('find',items.length)
     return {
       count,
       items,
     };
   }
  }

  async getSubcategories(category_id){
    let subcategories=[]
    try{
        const snapshot = await firebase.firestore().collection('subcategories').where('category_id','==',category_id).get()
        snapshot.forEach((doc) => {
          subcategories.push(doc.data());
            // //console.log(doc.data())
         });
    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return subcategories
    }
    // snapshot.
  }

  async getGoodsById(ids: string[]){
    const promises = ids.map(id => {
      return new Promise((resolve) => {
            this.getGood(id)
                .then(product => {
                    resolve(product)
                }).catch( _ => {
                    resolve(null)
                })
        })
    })
    let items = await Promise.all(promises);
    return items
  }

  async getGood(id : string){
    console.log('get item',id)
    if(!id){
      return 
    }
    let product = {}
    try{
      const doc = await firebase.firestore().collection('clothes').doc(id).get()
      let data;
      if(doc.exists){
        product = doc.data()  
      }
      return data
    }catch(err){
      console.log('ERROR DURING FETCH GOOD',err)
    }finally{
      return product
    }
  }

  async getUser(user_id : string ){
    console.log('get user',user_id)
    if(!user_id){
      return 
    }
    let user = {}
    try{
      const doc = await firebase.firestore().collection('users').doc(user_id).get()
      if(doc.exists){
        user = doc.data()
      }
    }catch(err){
      console.log('ERROR DURING FETCH USER',err)
    }finally{
      console.log('found user',user)
      return user
    }
  }

  async getSlides(){
    // if()
    let slides = [];
    try{
      let snapshot;
      snapshot  = await firebase.firestore().collection('slides')
            .get()
      snapshot.forEach(s => {
        slides.push(s.data())
    })
    }catch(err){
      console.log('error during fetching slides', err)
    }
    finally {
      return slides;
    }
  }

  async fetchCollection(options = {}, time = {}){
        // if()
        console.log('options',options)
        // console.log('time',time)
        let collection = {};
        try{
          let snapshot;
          let query = firebase.firestore().collection('collections')
          Object
            .keys(options)
            .forEach(key => {
              if(_.isArray(options[key])){
                query = query.where(key, 'array-contains-any',options[key])
              }else{
                query = query.where(key,'==', options[key])
              }
            })
          if(time.createdAt){
            query = query.where('createdAt','>=',time.createdAt)
          }

          query = query.limit(1)
          snapshot = await query.get()
          snapshot.forEach(s => {
            collection = s.data()
          })
          console.log('collection',collection)
          if(collection.id){
            let subtypes = []
            let stSnapshot = await firebase.firestore().collection('subtypes').where('collection_ids','array-contains',collection.id).get()
            stSnapshot.forEach(s => {
              subtypes.push(s.data())
            })
            collection.subtypes = subtypes
            if(!subtypes || subtypes.length == 0){
              collection = {}
            }
          }
        }catch(err){
          console.log('error during fetching collection', err)
        }
        finally {
          // console.log('find',collection.length)
          return collection;
        }
  }

  async getGoods(options = {}, time = {}, limit){
    // if()
    console.log('options',options)
    console.log('time',time)
    let goods = [];
    let count = null;
    try{
      let snapshot;
      let query = firebase.firestore().collection('clothes').where('isApproved','==', true)
      Object
        .keys(options)
        .forEach(key => {
          if(_.isArray(options[key])){
            query = query.where(key, 'array-contains-any',options[key])
          }else{
            query = query.where(key,'==', options[key])
          }
        })
      if(time.createdAt){
        query = query.where('createdAt','>=',time.createdAt)
      }
      if(limit){
        query = query.limit(limit)
      }
      // console.log('query',query)
      snapshot = await query.orderBy('createdAt', "desc").get()
      count  = snapshot.size
      // .where("specs.B6", isEqualTo: true)
      // .whereField("vitamins.C", isEqualTo: true)
      snapshot.forEach(s => {
        goods.push(s.data())
      })
    }catch(err){
      console.log('error during fetching goods', err)
    }
    finally {
      console.log('find',goods.length)
      return {
        count,
        items: goods,
      };
    }
  }

  async getUserGoods({user_id}){
    // if()
    let goods = [];
    try{
      let snapshot;
      snapshot  = await firebase.firestore().collection('clothes')
          .where('user_id','==', user_id)
          .where('status','==', 'accepted')
          .get()
      snapshot.forEach(s => {
        goods.push(s.data())
    })
    }catch(err){
      console.log('error during fetching goods', err)
    }
    finally {
      return goods;
    }
  }

  

  async createOrder({
    items,
    shippingAddress,
    created_time,  
    payment_method, 
    amount,
    token,
    orderStatus  = 'confirmed',
    ...otherProps
  } : {token:string} & Order){
    let user  = {
      uid :  Ayoba.getUserPhone() || "tst"
    }

    // const user = firebase.auth().currentUser;
    
    // if (!user) {
    //   return
    // //  console.log('User email: ', user.email');
    // }
    try{
         
      
      
      let orderDoc =  firebase.firestore().collection('orders').doc()
      let chargeDoc = firebase.firestore().collection('stripe_customers').doc(user.uid).collection('charges').doc()

      await orderDoc.set({
          user_id : user.uid,
          email : user.email,
          // payment_email : email,
          amount,
          charge_id : chargeDoc.id,
          id: orderDoc.id,
          items,
          shippingAddress,
          created_time,  
          payment_method, 
          orderStatus,
          ...otherProps
      })

      await chargeDoc.set({
          id: chargeDoc.id,
          amount:  Math.floor(amount),
          source:  token,
      })
      
      return true
    }catch(err){
      return false
        //console.log('ERROR DURING CREATING ORDER',err)
    }
  }

  async getMyOrders(){
    let orders = []
    let count = 0
    try{
      // const user_id = firebase.auth().currentUser.uid;
      let user = {
      }
      try{
        let phone = Ayoba.getUserPhone() || ""
        user.uid = phone
      }catch(err){
        user.uid = 'tst'
      }
      // console.log('user_id',user_id)
      const snapshot = await firebase.firestore().collection('orders').where('user_id','==',user.uid).get()
      // console.log('snapshot',snapshot)
      snapshot.forEach(s => {
        orders.push(s.data())
      })
      count = snapshot.size
      // console.log('orders length - ',orders.length)
    }catch(err){

    }finally{
      return {
        count,
        items: orders
      }
    }
  }

  async createProduct(options){
    let succesfull = false
    
    // console.log('create product ',options)
    // Alert.alert('Wait, creating product...')
    // const user = firebase.auth().currentUser;
    // const user = {
    //   uid : '1234'
    // }
    // const user = firebase.auth().currentUser
    // if(!user){
    //   return Alert.alert('You must login firstly')
    // }
    let user = {}
    try{
      let phone = Ayoba.getUserPhone() || ""
      user.uid = phone
    }catch(err){
      user.uid = 'tst'
    }

    // let imagesPromises = []
    // for(let i=1;i<6;i++){
    //   let photo = options['photo'+i]
    //   // console.log('photo',photo)
    //   imagesPromises.push(new Promise((resolve) => {
    //     try{
    //       const storageForDefaultApp = firebase.storage();
    //       storageForDefaultApp
    //         .ref('images/'+ user.uid + '_' + Date.now())
    //         .putFile(photo.path)
    //         .then(async file => {
    //           // console.log('file',file)
    //             let fullPath = file.metadata.fullPath
    //             let downloadedURL = await storageForDefaultApp.ref(fullPath).getDownloadURL()
    //             // console.log('downloaded link ',downloadedURL)
    //             resolve({
    //               title : 'photo'+i,
    //               src : downloadedURL   
    //             })
    //         }).catch( err => {
    //           resolve({name :'photo'+i, url : null})
    //         })
    //     }catch(err){
    //       console.log('ERROR',err)
    //     }

    //   })
    // )
    // }

    console.log('options',options)
    options = _.pickBy(options,  _.identity)
    // options = options.filter(o => o)
    // const images : ProductImage[] = await Promise.all(imagesPromises)
    // try{
      let doc = firebase.firestore().collection('clothes').doc()
      await doc.set({
        ...options,
        id: doc.id,
        photo1: null,
        photo2: null,
        photo3: null,
        photo4: null,
        photo5: null,
        images : [],
        user_id : user?.uid || 'test',
        // createdAt : Date.now(),
        // created_time : Date.now(),
        // updatedAt : Date.now(),
        status : 'image_cropped',
        express_delivery: false,
        we_love: false,
        vintage: false,
        reputation: "",
      })
      succesfull = true
      // Alert.alert('Submitted for review')
    // }catch(err){
    //   console.log('ERROR DURING CREATING PRODUCT ',err)
    //   // alert('There was an loading error')
    //   succesfull = false
    // }
    // finally{
    //   return succesfull
    // }
    return succesfull
  }
  /**
   * for negotiations
   */
  async getNegotiation(options = {}){
    let negotiation : Negotiations = {}
    // console.log('options',options)
    try{
      let user_id = firebase.auth().currentUser?.uid
      if(!user_id){
        console.log('login first')
        return 
      }
      let query = firebase.firestore().collection('negotiations')
      if(options.id){
        let doc = await query.doc(options.id).get()
        negotiation = doc.data()
      }
      else if(options){
          query = query.where('user_id', '==',user_id)
          query = query.where('product_id', '==',options.product_id)
          query = query.limit(1)
          // Object  
            // .keys(options)
            // .forEach(key => {
            //     if(_.isArray(options[key])){
            //         query = query.where(key, 'array-contains-any',options[key])
            //     }else{
            //         query = query.where(key,'==', options[key])
            //     }
            // })
          let snapshot = await query.get()
          snapshot.forEach(s => {
            negotiation = s.data()
          })
      }
      else{

      }
    }catch(err){

    }finally{
      console.log('fetched negotiation',negotiation)
      return negotiation
    }
  }

  async getMyNegotiations(options = {}){
    let negotiations = []
    let count = 0
    console.log('options',options)
    try{
      let user_id = firebase.auth().currentUser.uid
      if(!user_id){
        console.log('login first')
        return 
      }
      let query = firebase.firestore().collection('negotiations')
              .where('user_id','==',user_id)
              .where('answered','==',false)

      let snapshot = await query.get()
      count = snapshot.size
      snapshot.forEach(s => {
        negotiations.push(s.data())
      })
    }catch(err){

    }finally{
      // console.log('fetched negotiation',negotiations)
      return {
        count,
        items: negotiations
      }
    }
  }

  async createNegotiation(options = {}){
    console.log('createNegotiation')
    const user = firebase.auth().currentUser;
    console.log('cre new neg',user)
    if(!user || !user.uid){
      return 
    }
    let negotiation = null
    try{
        let doc = firebase.firestore().collection('negotiations').doc()
        const newDoc = {
          id: doc.id, 
          user_id : user?.uid,
          ...options
        }
        let responce = await doc.set(newDoc)
        negotiation = newDoc
    }catch(err){
      console.log('ERROR DURING ADD NEW NEGOTIATION',err)
      negotiation = null
    }finally{
      return negotiation
    }
  }

  async updateNegotiation(options = {}){
    console.log('updateNegotiation',options)
    // const user = firebase.auth().currentUser;
    // if(!user || !user.uid){
    //   return 
    // }
    let succesfull = false
    try{
      const response = await firebase.firestore().collection('negotiations').doc(options.id).update({
        isAccepted : options.isAccepted,
        answered : true,
        answeredAt : Date.now(),
      })
      succesfull = true
    }catch(err){
      console.log('ERROR DURING updateNegotiation',err)
      succesfull = false
    }finally{
      return succesfull
    }
  }

  async updateInfo(){
      // //console.log('updateInfo for cart ...')
      // let cartItems = getCartitems(getState())
      // // //console.log('cartItems',cartItems)
      // // dispatch(setCartItems([]))
      // // if(typeof cartItems != 'array'){
      // //     return
      // // }
      // cartItems = cartItems.filter( c => c.id && c)
      // // //console.log('cartItems updateInfo - ',cartItems)
      // // //console.log('componentDidUpdate cartItems',cartItems)
      // if(cartItems.length == 0 ){
      //     return
      // }
      // dispatch(setCartLoading(true))
      // const promises =  cartItems.map(item => {
      //     return new Promise((resolve) => {
      //         Shop.
      //         getGood(item.id)
      //             .then(product => {
      //                 //console.log('product',item.id,product)
      //                 // ifproduct){
      //                 resolve({ ...item, ...product})
      //                 // }else{
      //                 //     resolve(null)
      //                 // }
      //             }).catch( _ => {
      //                 resolve(null)
      //             })
      //     })
    // })
    //console.log('await all ...')
    /* 
        TODO : Додати перевірку при оплаті, коли було 
        останнє оновлення ціни
    */
  //  let products = []
  //   try{
  //        products = await Promise.all(promises);
  //   }catch(err){
  //       //console.log('ERROR DUTING UPDATE CART ITEMS -',err)
  //   }
  //   products = products.filter( p => p != null)
  //   // //console.log('products updated -',products)
  //   dispatch(setCartItems(products))
  //   dispatch(setCartLoading(false))

    // this.props.setProducts(products);
  }

  /**
   * 
   * comment section
   */
  async postComment(text : string, productId: string, parentId: srting) {
    // const user = firebase.auth().currentUser;
    // if(!user || !user.uid){
    //   return 
    // }
    let userDoc = await firebase.firestore().collection('users').doc(user.uid).get()
    let userData : User = userDoc.data()

    let successfull = false
    let doc = firebase.firestore().collection('comments').doc()
    let ts = Date.now()
    const newComment = {
      id: doc.id,
      snippet: {
        productId,
        authorId : user.uid,
        textDisplay: text,
        textOriginal: text,
        parentId: parentId || "",
        canRate : false,
        moderationStatus : "onReview",
        publishedAt: moment(new Date(ts)).format(constants.publishedAtFormat),
        published_time: ts,
        updatedAt: moment(new Date(ts)).format(constants.updatedAtFormat),
        updated_time: ts,
      },
      user: {
        uid: user.uid,
        name: userData.name || "",
        last_name: userData.last_name || "",
        avatar: userData.avatar || "",
      },
      likes: [],
      dislikes: []
    }

    try{
        await doc.set({
          ...newComment,
          id: doc.id
        })
        successfull = true
    }catch(err){
      console.log('ERROR DURING POST COMMENT',err)
    }finally{
      return {
        successfull,
        item: newComment
      }
    }
  }
  
  async likeComment(id : string) {
    // const user = firebase.auth().currentUser;
    // if(!user || !user.uid){
    //   return 
    // }
    if(!id){
      console.log('no id',id)
      return 
    }
    console.log('id',id)
    let successfull = false
    try{
        await firebase.firestore().collection('comments').doc(id).update({
            likes: firestore.FieldValue.arrayUnion(user.uid),
            dislikes: firestore.FieldValue.arrayRemove(user.uid),
        })
        successfull = true
    }catch(err){
      console.log('ERROR DURING LIKE COMMENT',err)
    }finally{
      return {
        successfull,
        user_id : user.uid
      } 
    }
  }
  
  async unlikeComment(id : string) {
    // const user = firebase.auth().currentUser;
    // if(!user || !user.uid){
    //   return 
    // }
    if(!id){
      console.log('no id',id)
      return 
    }
    console.log('id',id)
    let successfull = false
    try{
        await firebase.firestore().collection('comments').doc(id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
            dislikes: firebase.firestore.FieldValue.arrayUnion(user.uid),
        })
        successfull = true
    }catch(err){
      console.log('ERROR DURING DISLIKE COMMENT',err)
    }finally{
      return {
        successfull,
        user_id : user.uid
      } 
    }
  }


}

export default new ShopService();
