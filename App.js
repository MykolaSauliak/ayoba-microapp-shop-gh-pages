import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox, Text } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import FirebaseService from './services/FirebaseService'
import { NavigationService, ShopService, Ayoba } from './services';
import { getAyoba } from './libs/microapp';

FirebaseService.init()

const { store, persistor } = configureStore();

console.disableYellowBox = true;

export default function App(props) {
  
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {/* <Text>{JSON.stringify(getAyoba())}</Text>
            <Text>globalAyoba {JSON.stringify(global.Ayoba)}</Text>
            <Text>phone {getAyoba()?.getMsisdn()}</Text>
            <Text>phone from service {Ayoba.getUserPhone()}</Text> */}
            {/* <div><p>test</p></div> */}
            <AppNavigator 
              ref={(ref) => NavigationService.init(ref)}
              />
          </View>
      </PersistGate>
    </Provider>
    );
  }
}

async function loadResourcesAsync() {
  FirebaseService.init()
  await Ayoba.init(store)
  ShopService.init(store)
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
