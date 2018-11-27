/* @flow */
import React from 'react';
import { View } from 'react-native';
import LeftFooter from './components/LeftFooter';
import CenterFooter from './components/CenterFooter';
import RightFooter from './components/RightFooter';
import type { FlashMode } from '../CameraHandler';

type Props = {
  lastFile: ?Object,
  pagesCount: number,
  flashMode: FlashMode,
  openPreview: Function,
  onFlashModeChange: Function,
  shoot: Function,
  send: Function,
}

const CameraFooter = ({
  openPreview,
  lastFile,
  pagesCount,
  shoot,
  onFlashModeChange,
  flashMode,
  send,
}: Props) => (
  <View
    style={{
      position: 'absolute',
      flex: 1,
      bottom: 30,
      flexDirection: 'row',
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
    }}
  >
    <LeftFooter
      openPreview={openPreview}
      lastFile={lastFile}
      pagesCount={pagesCount}
    />
    <CenterFooter shoot={shoot} />
    <RightFooter
      showSend={!!pagesCount}
      onFlashModeChange={onFlashModeChange}
      flashMode={flashMode}
      send={send}
    />
  </View>
);

export default CameraFooter;
