/* @flow */
import React from 'react';
import { Camera as RNCamera } from 'expo';
import {
  View,
  StyleSheet,
} from 'react-native';
import CameraFooter from '../CameraFooter';
import type { FlashMode } from '../CameraHandler';

type Props = {
  flashMode: FlashMode,
  pagesCount: number,
  ratio: string,
  lastFile: ?Object,
  onFlashModeChange: Function,
  onCameraReady: Function,
  getRef: Function,
  shoot: Function,
  openPreview: Function,
  send: Function,
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

const Camera = ({
  getRef,
  shoot,
  flashMode,
  onFlashModeChange,
  ratio,
  onCameraReady,
  pagesCount,
  lastFile,
  send,
  openPreview,
}: Props) => (
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
      flashMode={RNCamera.Constants.FlashMode[flashMode]}
      permissionDialogMessage="Ukážeš mi jí?"
      ref={getRef}
      ratio={ratio}
      onCameraReady={onCameraReady}
    />
    <CameraFooter
      openPreview={openPreview}
      lastFile={lastFile}
      pagesCount={pagesCount}
      shoot={shoot}
      onFlashModeChange={onFlashModeChange}
      flashMode={flashMode}
      send={send}
    />
  </View>
);

export default Camera;
