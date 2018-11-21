/* @flow */
import { NativeRouter, Route, Link, BackButton } from "react-router-native";
import { StyleSheet, Text, View } from 'react-native';
import Camera from './src/components/Camera';
import Login from './src/components/Login';
import React from 'react';

const App = () => (
  <NativeRouter>
    <View style={styles.container}>
      <BackButton />
      <Route exact path="/" component={Login} />
      <Route path="/camera" component={Camera} />
    </View>
  </NativeRouter>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  }
});

export default App;
