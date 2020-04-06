import ProfileView from './ProfileView';
import {
  compose,
  withProps,
  withHandlers,
  withState,
  lifecycle,
} from 'recompose';
import {connect} from 'react-redux';
import {getWishList} from '../../features/wishlist/selectors';
import {getCartitems} from '../../features/cart/selectors';
import {getUser} from '../../features/user/selectors';
import {setAvatar} from '../../features/user/actions';
import {AuthService} from '../../services';
// import ImagePicker from 'react-native-image-crop-picker';

const mapStateToProps = state => ({
  // wishlist: getWishList(state),
  // cartItems: getCartitems(state),
  user: getUser(state),
  email: getUser(state) ? getUser(state).email : '',
  uid: getUser(state) ? getUser(state).uid : '',
  name: getUser(state) ? getUser(state).name : '',
  surname: getUser(state) ? getUser(state).last_name : '',
  avatar: getUser(state) ? getUser(state).avatar : null,
});

const mapDispatchToProps = dispatch => ({
  changeAvatar: newUrl => dispatch(setAvatar(newUrl)),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('checked', 'setChecked', false),
  withState('locale', 'setLocale', null),
  withState('avatarLoading', 'setAvatarLoading', false),
  withHandlers({
    onLogout: props => async () => {
      await AuthService.logout();
    },
    onAvatarPress: ({changeAvatar, setAvatarLoading}) => () => {
      // ImagePicker.openPicker({}).then(async image => {
      //   console.log('image', image);
      //   setAvatarLoading(true);
      //   let newUrl = await AuthService.changeAvatar(image.path);
      //   changeAvatar(newUrl);
      //   setAvatarLoading(false);
      //   // setImages([...images, ...imgs]);
      //   // console.log(images);
      // });
    },
  }),
);

export default enhance(ProfileView);
