/* @flow */
import React from 'react';
import { Camera as RNCamera } from 'expo';
import {
  View,
  StyleSheet,
} from 'react-native';
import CenterFooter from './component/CenterFooter';
import LeftFooter from './component/LeftFooter';
import RightFooter from './component/RightFooter';
import type { FlashMode } from '../CameraHandler';

type Props = {
  multiple: boolean,
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
        onFlashModeChange={onFlashModeChange}
        flashMode={flashMode}
      />
    </View>
  </View>
);

export default Camera;
