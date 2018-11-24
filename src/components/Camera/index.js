/* @flow */
import React from 'react';
import { Camera as RNCamera } from 'expo';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import logo from '../../images/logo2.png';

type Props = {
  shoot: Function,
  getRef: Function,
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

const Camera = ({ getRef, shoot }: Props) => (
  <View style={{
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }}
  >
    <RNCamera
      style={styles.camera}
      type={RNCamera.Constants.Type.back}
      permissionDialogMessage="Ukážeš mi jí?"
      ref={getRef}
    />
    <TouchableOpacity
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 40,
        width: 70,
        height: 70,
        flex: 1,
        bottom: 30,
        padding: 10,
      }}
      onPress={shoot}
    >
      <Image
        source={logo}
        style={{
          width: 50,
          height: 50,
        }}
      />
    </TouchableOpacity>
  </View>
);

export default Camera;
