/* @flow */
import React from 'react';
import { Text } from 'react-native';

type Props = { value: number, style?: Object }

const IndexNumber = ({ value, style }: Props) => (
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
      ...style,
    }}
  >
    {value}
  </Text>
);

IndexNumber.defaultProps = {
  style: {},
};

export default IndexNumber;
