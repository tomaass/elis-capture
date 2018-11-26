/* @flow */
import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import IndexNumber from '../../IndexNumber';

type Props = {
  lastFile: ?Object,
  pagesCount: number,
  openPreview: Function,
}

const LeftFooter = ({ lastFile, pagesCount, openPreview }: Props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {lastFile && (
      <TouchableOpacity
        onPress={openPreview}
        style={{ width: 30, height: 30 }}
      >
        <ImageBackground source={{ uri: lastFile.uri }}>
          <IndexNumber value={pagesCount} />
        </ImageBackground>
      </TouchableOpacity>
    )}
  </View>
);

export default LeftFooter;
