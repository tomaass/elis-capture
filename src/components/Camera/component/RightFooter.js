/* @flow */
import { View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import type { FlashMode } from '../../CameraHandler';

const flashModes = {
  on: 'flash',
  auto: 'flash-auto',
  off: 'flash-off',
};

type Props = { onFlashModeChange: Function, flashMode: FlashMode }

const RightFooter = ({ onFlashModeChange, flashMode }: Props) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      height: '100%',
    }}
  >
    <TouchableWithoutFeedback onPress={onFlashModeChange}>
      <Icon
        color="white"
        name={flashModes[flashMode]}
        type="material-community"
        size={30}
      />
    </TouchableWithoutFeedback>
  </View>
);

export default RightFooter;
