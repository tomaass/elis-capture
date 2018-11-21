/* @flow */
import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/modules/user/actions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1922',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },

  logoWrapper: {
    alignItems: 'center',
  },

  formWrapper: {
    alignItems: 'center',
    flex: 1,
  },

  logoText: {
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

type State = { username: string, password: string }
type Props = { login: Function }

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    const { username, password } = this.state;
    const { login } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
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
