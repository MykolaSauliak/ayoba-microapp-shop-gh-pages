import SelectSellerView from './SelectSellerView';
import {compose, withProps, withHandlers} from 'recompose';
// import { connect } from "react-redux";
// import models from '../../mockData/models'
import screens from '../../../../constants/screens';
import {withSell, withAddresses} from '../../../../utils/enhancers';
// import {
//     setSeller
//  } from '../../../../features/seller/actions'
// import {
//     getSelectedAddress,
//     getAddresses
//  } from '../../../../features/shippingaddress/selectors'
// import {
//     getSelectedSellCategory,
//     getSelectedSellSubcategory,
//     getSelectedSellType,
//     getSelectedSellSubtype,
//     getSelectedSellBrand,
//     getSelectedSellMaterial,
//     getSelectedSellColor,
//     getSelectedSellPrinted,
//     getSelectedSellPhotos,
//     getSelectedSellDescription,
//     getSelectedSellMeasurements,
//     getSelectedSellCondition,
//     getSelectedSellPrice,
//     getSeller
// } from '../../../../features/seller/selectors'   // import { getCartitems } from '../../features/cart/selectors'

// const mapStateToProps = (state) => ({
// material : getSelectedSellMaterial(state),
// category : getSelectedSellCategory(state),
// subcategory : getSelectedSellSubcategory(state),
// color : getSelectedSellColor(state),
// printed : getSelectedSellPrinted(state),
// photos : getSelectedSellPhotos(state),
// description : getSelectedSellDescription(state),
// measurements : getSelectedSellMeasurements(state),
// condition : getSelectedSellCondition(state),
// price : getSelectedSellPrice(state),
// seller : getSeller(state),
// address : getSelectedAddress(state),
// addresses : getAddresses(state),
// selectedModel : getSelectedModel(state),
// })

// const mapDispatchToProps = (dispatch) => ({
//     saveSeller : (seller) => dispatch(setSeller(seller)),
//     // selectedModel : getSelectedModel(state),
// })

const enhance = compose(
  withSell(),
  withAddresses(),
  // connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
    // models
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => model => {
      // dispatch(setSelectedModel(model))
      // //console.log('model',model)
      // navigation.navigate(screens.SelectType, {
      //     model,
      //     cars : navigation.getParam('cars','[]')
      // })
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellMainSteps);
    },
    goToPersonalContact: ({navigation}) => () => {
      navigation.navigate(screens.AddShippingAddressScreen);
    },
  }),
);

export default enhance(SelectSellerView);
