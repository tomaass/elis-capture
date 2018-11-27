/* @flow */
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

type Props = {
  multiple: boolean,
  removeAll: Function,
  send: Function,
}

const PreviewFooter = ({
  removeAll,
  multiple,
  send,
}: Props) => (
  <View style={{
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'space-between',
    flex: 1,
  }}
  >
    <Button
      backgroundColor="transparent"
      onPress={removeAll}
      icon={{ name: multiple ? 'delete-sweep' : 'delete', size: 20 }}
      title={multiple ? 'Remove all' : 'Delete'}
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
);

export default PreviewFooter;
