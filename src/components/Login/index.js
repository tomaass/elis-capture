/* @flow */
import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  Image,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/modules/user/actions';

import logo from '../../images/logo2.png';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1922',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },

  logoWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  formWrapper: {
    alignItems: 'center',
    flex: 1,
  },

  logoText: {
    flex: 1,
    flexDirection: 'row',
  },

  whiteText: {
    color: 'white',
    fontSize: 20,
  },

  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

type State = { username: string, password: string, keyboardIsOpen: boolean }
type Props = { login: Function }

class Login extends React.Component<Props, State> {
  keyboardDidShowListener = {};

  keyboardDidHideListener = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      keyboardIsOpen: false,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () =>
    this.setState({ keyboardIsOpen: true });

  keyboardDidHide = () =>
    this.setState({ keyboardIsOpen: false });

  // componentWillMount() {
  //   this.props.login();
  // }

  render() {
    const { username, password, keyboardIsOpen } = this.state;
    const { login } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          {!keyboardIsOpen && <Image source={logo} style={{ flex: 1, width: 100 }} />}
          <View style={styles.logoText}>
            <Text style={[styles.whiteText, styles.boldText]}>
              ELIS
            </Text>
            <Text style={styles.whiteText}>
              CAPTURE
            </Text>
          </View>
          <View style={styles.logoText}>
            <Text style={{ color: 'white' }}>
              by ROSSUM
            </Text>
          </View>
        </View>
        <View style={styles.formWrapper}>
          <View style={{ flex: 1 }}>
            <TextInput
              value={username}
              style={{ color: '#979797' }}
              placeholder="E-mail"
              onChangeText={value => this.setState({ username: value })}
              placeholderTextColor="#979797"
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              value={password}
              style={{ color: '#979797' }}
              placeholder="Password"
              onChangeText={value => this.setState({ password: value })}
              placeholderTextColor="#979797"
              secureTextEntry
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Login"
              onPress={() => login({ password, username })}
              color="white"
              style={{ backgroundColor: '#2f72ff' }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (...args) => dispatch(loginUser(...args)),
});

export default connect(null, mapDispatchToProps)(Login);
