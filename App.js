/* @flow */
import {
  NativeRouter,
  Route,
  BackButton,
} from 'react-router-native';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Camera from './src/components/Camera';
import Login from './src/components/Login';
import store from './src/redux/configureStore';

const App = () => (
  <Provider store={store}>
    <NativeRouter>
      <View style={styles.container}>
        <BackButton />
        <Route exact path="/" component={Login} />
        <Route path="/camera" component={Camera} />
      </View>
    </NativeRouter>
  </Provider>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
});

export default App;
