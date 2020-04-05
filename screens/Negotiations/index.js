import {
  compose,
  withProps,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';
import {
  Alert
} from 'react-native';
import {
  withNotifications, 
  withLoading, 
  withAuth
} from '../../utils/enhancers';
import NegotiationsView from './NegotiationsView';
import {ShopService} from '../../services';
import _ from 'lodash';

const enhance = compose(
  withNotifications(),
  withLoading(),
  withAuth(),
  withState('lastUpdate', 'setLastUpdate', null),
  // withState('offer','setOffer',null),
  // withState('answer','setAnswer',null),
  withProps(({navigation}) => ({
    id: navigation.getParam('id', null), // negotiation id
    item: navigation.getParam('item', {}),
  })),
  withHandlers({
    // acceptOffer: ({setNegotiation, negotiation}) => () => {
    //   Alert.alert(
    //     //title
    //     'Do you really want to accept this price? ',
    //     //body
    //     '',
    //     [
    //       {
    //         text: 'Yes',
    //         onPress: async () => {
    //           const update = {
    //             id: negotiation.id,
    //             isAccepted: true,
    //             answered: true,
    //             answeredAt: Date.now(),
    //           };
    //           let succesfull = await ShopService.updateNegotiation(update);
    //           if (succesfull) {
    //             setNegotiation({
    //               ...negotiation,
    //               ...update,
    //             });
    //           } else {
    //             Alert.alert('Some errors, try later ...');
    //           }
    //         },
    //       },
    //       {
    //         text: 'No',
    //         onPress: () => console.log('No Pressed'),
    //         style: 'cancel',
    //       },
    //     ],
    //     {cancelable: false},
    //     //clicking out side of alert will not cancel
    //   );
    // },
    // declineOffer: ({negotiation, setNegotiation}) => () => {
    //   Alert.alert(
    //     'Do you really want to decline this price? ',
    //     '',
    //     [
    //       {
    //         text: 'Yes',
    //         onPress: async () => {
    //           const update = {
    //             id: negotiation.id,
    //             isAccepted: false,
    //             answered: true,
    //             answeredAt: Date.now(),
    //           };
    //           let succesfull = await ShopService.updateNegotiation(update);
    //           if (succesfull) {
    //             setNegotiation({
    //                 ...negotiation,
    //                 ...update,
    //             });
    //           } else {
    //             Alert.alert('Some errors, try later ...');
    //           }
    //         },
    //       },
    //       {
    //         text: 'No',
    //         onPress: () => console.log('No Pressed'),
    //         style: 'cancel',
    //       },
    //     ],
    //     {cancelable: false},
    //     //clicking out side of alert will not cancel
    //   );
    // },
  }),
  lifecycle({
    // async componentDidMount() {
    //   // console.log('componentDidMount')
    //   this.props.setLoading(true);
    //   let negotiation = await ShopService.getNegotiation({
    //     id: this.props.id,
    //     product_id: this.props.item.product_id,
    //   });
    //   console.log('componentDidMount negotiation', negotiation);
    //   // if(negotiation && (negotiation.user_id === this.props.user.uid || negotiation.seller_id === this.props.user.uid)){
    //   // if(!this.props.item.id){
    //   if (negotiation) {
    //     let item = await ShopService.getGood(negotiation.product_id);
    //     console.log('item', item);
    //     this.props.setItem(item);
    //     this.props.setLastUpdate(Date.now());
    //     // }
    //     this.props.setNegotiation(negotiation);
    //     let sellerUser = await ShopService.getUser(negotiation.seller_id);
    //     let buyerUser = await ShopService.getUser(negotiation.user_id);
    //     this.props.setSellerUser(sellerUser);
    //     this.props.setBuyerUser(buyerUser);
    //     // }
    //   }

    //   this.props.setLoading(false);
    // },
    // async componentDidUpdate(prevProps, prevState) {
    //   if (!_.isEqual(prevProps.id, this.props.id)) {
    //     this.props.setLoading(true);
    //     let negotiation = await ShopService.getNegotiation({
    //       id: this.props.id,
    //       product_id: this.props.item.product_id,
    //     });
    //     console.log('componentDidUpdate negotiation', negotiation);
    //     if (negotiation) {
    //       let item = await ShopService.getGood(negotiation.product_id);
    //       this.props.setItem(item);
    //       console.log('item', item.id);
    //       this.props.setNegotiation(negotiation);
    //       let sellerUser = await ShopService.getUser(negotiation.seller_id);
    //       let buyerUser = await ShopService.getUser(negotiation.user_id);
    //       this.props.setSellerUser(sellerUser);
    //       this.props.setBuyerUser(buyerUser);
    //     }
    //     this.props.setLoading(false);
    //   }
    // },
  }),
);

export default enhance(NegotiationsView);
