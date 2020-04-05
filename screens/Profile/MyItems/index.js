import {compose, withState, withHandlers, lifecycle} from 'recompose';
import MyItems from './MyItems';
// import { getSounds } from '../../features/sounds/selectors';
import {ShopService} from '../../../services';
import {withReduxLoading, withStateLoading} from '../../../utils/enhancers';

const enhance = compose(
  withState('items', 'setMyItems', []),
  withStateLoading(),
  withHandlers({
    openAudio: props => item => {
      // props.navigation.navigate(screens.PlayerScreen, {...item})
    },
  }),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      const {count, items: myItems} = await ShopService.getMyItems();
      // console.log('myItems',myItems)
      this.props.setMyItems(myItems);
      this.props.setLoading(false);
    },
  }),
);

export default enhance(MyItems);
