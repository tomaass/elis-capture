/* @flow */
import React from 'react';
import { ImageBackground, View } from 'react-native';
import Swiper from 'react-native-swiper';
import IndexNumber from '../IndexNumber';
import RemoveIcon from './components/RemoveIcon';
import RedoIcon from './components/RedoIcon';

type Props = {
  pages: Array<Object>,
  remove: Function,
  redo: Function,
}

const PreviewPages = ({
  pages,
  remove,
  redo,
}: Props) => (
  <Swiper
    loop={false}
    showsButtons
  >
    {pages.map(({ uri }, index) => (
      <ImageBackground
        key={uri}
        imageStyle={{ resizeMode: 'contain' }}
        style={{ flex: 1 }}
        source={{ uri }}
      >
        {(pages.length > 1) && (
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
          >
            <IndexNumber value={index + 1} />
            <RemoveIcon remove={() => remove(index)} />
            <RedoIcon redo={() => redo(index)} />
          </View>
        )}
      </ImageBackground>
    ))}
  </Swiper>
);

export default PreviewPages;
