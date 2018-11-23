/* @flow */
import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
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
    alignItems: 'center',
    flex: 1,
  },
  FormWrapper: {
    flex: 2,
    justifyContent: 'flex-start',
    marginTop: 40,
    alignItems: 'center',
    width: '80%',
  },
  Input: {
    width: '80%',
    margin: 5,
    borderBottomColor: '#403e46',
    borderBottomWidth: 1,
  },
  Button: {
    width: '30%',
    height: 40,
    backgroundColor: '#2f72ff',
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
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

  componentWillMount() {
    this.props.login();
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

  render() {
    const { username, password, keyboardIsOpen } = this.state;
    const { login } = this.props;
    return (
      <View style={styles.container}>
        <View style={{
          flex: keyboardIsOpen ? 0.5 : 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        >
          <Image source={logo} style={{ width: 70, height: 70 }} />
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 10,
          }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{
                color: 'white',
                fontSize: 20,
                letterSpacing: 1,
                fontWeight: 'bold',
              }}
              >
                ELIS
              </Text>
              <Text>{'   '}</Text>
              <Text style={{
                color: 'white',
                fontSize: 20,
                letterSpacing: 1,
              }}
              >
                CAPTURE
              </Text>
            </View>
            <Text style={{ color: 'white', opacity: 0.7 }}>
              by ROSSUM
            </Text>
          </View>
        </View>
        <View style={styles.FormWrapper}>
          <TextInput
            value={username}
            placeholder="E-mail"
            onChangeText={value =>
              this.setState({ username: value })}
            placeholderTextColor="#979797"
            style={styles.Input}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <TextInput
            value={password}
            placeholder="Password"
            onChangeText={value =>
              this.setState({ password: value })}
            placeholderTextColor="#979797"
            style={styles.Input}
            underlineColorAndroid="rgba(0,0,0,0)"
            secureTextEntry
          />
          <TouchableOpacity
            onPress={() => login({ password, username })}
            style={styles.Button}
          >
            <View>
              <Text style={{ color: 'white' }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (...args) => dispatch(loginUser(...args)),
});

export default connect(null, mapDispatchToProps)(Login);
