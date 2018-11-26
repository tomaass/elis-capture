/* @flow */
import React from 'react';
import { Text } from 'react-native';

type Props = { value: number }

const IndexNumber = ({ value }: Props) => (
  <Text
    style={{
      color: 'white',
      position: 'absolute',
      left: 50,
      top: 10,
      backgroundColor: '#2f72ff',
      width: 30,
      height: 30,
      borderRadius: 40,
      textAlign: 'center',
      fontSize: 20,
    }}
  >
    {value}
  </Text>
);

export default IndexNumber;
