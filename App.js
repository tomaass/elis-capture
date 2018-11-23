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
  Text,
} from 'react-native';
import Expo from 'expo';
import Camera from './src/components/Camera';
import Login from './src/components/Login';
import store from './src/redux/configureStore';
import Routing from './src/decorators/routing';

type Props = {}
type State = { fontsLoaded: boolean }

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { fontsLoaded: false };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      // eslint-disable-next-line
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    const { fontsLoaded } = this.state;
    return fontsLoaded
      ? (
        <Provider store={store}>
          <NativeRouter>
            <View style={styles.container}>
              <Routing />
              {/* <Button
                style={{ flex: 1 }}
                onPress={() => {
                  AsyncStorage.removeItem('TOKEN');
                }}
                title="Clear!"
                color="#841584"
              /> */}
              <Route exact path="/" component={Login} />
              <Route path="/camera" component={Camera} />
            </View>
          </NativeRouter>
        </Provider>
      )
      : (<Text>Hello svete</Text>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
});

export default App;
