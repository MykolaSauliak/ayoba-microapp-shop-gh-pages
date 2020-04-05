import {compose, withState, withHandlers, lifecycle} from 'recompose';
import PriceOfferSent from './PriceOfferSent';
// import { getSounds } from '../../features/sounds/selectors';
import {connect} from 'react-redux';
import screens from '../../../constants/screens';
import {ShopService} from '../../../services';
import {withReduxLoading, withStateLoading} from '../../../utils/enhancers';

const enhance = compose(
  withStateLoading(),
  withState('items', 'setItems', []),
  withHandlers({
    openAudio: props => item => {
      // props.navigation.navigate(screens.PlayerScreen, {...item})
    },
  }),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      const {
        count,
        items: myNegotiations,
      } = await ShopService.getMyNegotiations();
      this.props.setItems(myNegotiations);
      this.props.setLoading(false);
    },
  }),
);

export default enhance(PriceOfferSent);
