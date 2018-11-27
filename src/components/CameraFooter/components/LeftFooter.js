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
        style={{ width: 50, height: 50 }}
      >
        <ImageBackground
          style={{ width: 50, height: 50 }}
          source={{ uri: lastFile.uri }}
        >
          <IndexNumber
            value={pagesCount}
            style={{
              zIndex: 1,
              left: 15,
              top: 15,
              width: 20,
              height: 20,
              fontSize: 12,
            }}
          />
        </ImageBackground>
      </TouchableOpacity>
    )}
  </View>
);

export default LeftFooter;
