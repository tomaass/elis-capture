import { NativeRouter, Route, Link } from "react-router-native";
import { StyleSheet, Text, View } from 'react-native';
import Camera from './components/Camera';
import Login from './components/Login';
import React from 'react';

const App = () => (
  <NativeRouter>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Login</Text>
        </Link>
        <Link to="/camera" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>About</Text>
        </Link>
      </View>

      <Route exact path="/" component={Login} />
      <Route path="/camera" component={Camera} />
    </View>
  </NativeRouter>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

export default App;
