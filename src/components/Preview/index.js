/* @flow */
import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';

type Props = {
  send: Function,
  remove: Function,
  photoUri: string,
}

const Preview = ({ send, remove, photoUri }: Props) => (
  <View style={{ flex: 1, backgroundColor: '#1b1922' }}>
    <View style={{
      margin: '10%',
      flex: 9,
      marginBottom: 0,
    }}
    >
      <ImageBackground
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
        source={{ uri: photoUri }}
      />
    </View>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    }}
    >
      <Button
        backgroundColor="transparent"
        onPress={remove}
        icon={{ name: 'delete', size: 20 }}
        title="Delete"
        fontSize={18}
        buttonStyle={{ height: 40 }}
      />
      <Button
        onPress={send}
        borderRadius={10}
        backgroundColor="#2f72ff"
        icon={{ name: 'send', size: 20 }}
        title="Send"
        fontSize={18}
        buttonStyle={{ height: 40 }}
      />
    </View>
  </View>
);

export default Preview;
