/* @flow */
import { Text, TextInput, StyleSheet, View, Button } from 'react-native';
import React from 'react';
import Logo from './rossumLogo';

const Login = () => (
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
        <Text style={{ color: 'white' }} >
          by ROSSUM
        </Text>
      </View>
    </View>
    <View style={styles.formWrapper}>
      <View style={{ flex: 1 }}>
        <TextInput
          style={{ color: '#979797' }}
          placeholder='E-mail'
          placeholderTextColor= '#979797'
        />
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          style={{ color: '#979797' }}
          placeholder='Password'
          placeholderTextColor= '#979797'
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          title='Login'
          onPress={() => {}}
          color='white'
          style={{ backgroundColor: '#2f72ff' }}
        />
      </View>
    </View>
  </View>
  )

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1922',
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },

  logoWrapper: {
    flex: 1,
    alignItems: 'center'
  },

  formWrapper: {
    flex: 1,
    alignItems: 'center'
  },

  logoText: {
    flex: 1,
    flexDirection: 'row',
  },

  whiteText: {
    color: 'white',
    fontSize: 20
  },

  boldText: {
    fontWeight: 'bold',
    fontSize: 20
  }
})

export default Login;
