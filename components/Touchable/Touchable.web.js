import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import T from 'prop-types';

const Touchable = ({
  style,
  children,
  rippleColor,
  backgroundType,
  borderless,
  useForeground,
  ...props
}) => {
  if (Platform.Version <= 20) {
    return (
      <TouchableOpacity {...props} style={style}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    // <TouchableOpacity
    //   {...props}
    //   useForeground={Platform.Version >= 23 && useForeground}
    //   delayPressIn={0}
    //   background={
    //     backgroundType
    //       ? TouchableNativeFeedback.Ripple[backgroundType]()
    //       : TouchableNativeFeedback.Ripple(rippleColor, borderless)
    //   }>
      <View style={style}>{children}</View>
    // </TouchableOpacity>
  );
};

Touchable.defaultProps = {
  rippleColor: '#fff',
  borderless: false,
  useForeground: false,
};

Touchable.propTypes = {
  children: T.any,
  rippleColor: T.string,
  backgroundType: T.any,
  borderless: T.bool,
  useForeground: T.bool,
  style: T.object,
};

export default Touchable;
