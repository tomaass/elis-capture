/* @flow */
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';

const Camera = () => (
  <View style={styles.container}>
    <Text style={{ color: 'white', fontSize: 20 }}>There will be a camera</Text>;
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1922',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
})

export default Camera;
