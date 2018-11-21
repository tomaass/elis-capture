/* @flow */
import {
  NativeRouter,
  Route,
} from 'react-router-native';
import React from 'react';
import { Provider } from 'react-redux';
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
} from 'react-native';
import Camera from './src/components/Camera';
import Login from './src/components/Login';
import store from './src/redux/configureStore';
import Routing from './src/decorators/routing';

const App = () => (
  <Provider store={store}>
    <NativeRouter>
      <View style={styles.container}>
        <Routing />
        <Button
          style={{ flex: 1 }}
          onPress={() => {
            AsyncStorage.removeItem('TOKEN');
          }}
          title="Clear!"
          color="#841584"
        />
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
