/* @flow */
import React from 'react';
import { ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import IndexNumber from '../IndexNumber';
import RemoveIcon from './components/RemoveIcon';
import RedoIcon from './components/RedoIcon';

type Props = {
  currentPageIndex: number,
  pages: Array<Object>,
  height: number,
  width: number,
  onPageChange: Function,
  remove: Function,
  redo: Function,
}

const PreviewPages = ({
  currentPageIndex,
  onPageChange,
  pages,
  height,
  width,
  remove,
  redo,
}: Props) => (
  <Carousel
    layout="default"
    data={pages}
    onSnapToItem={onPageChange}
    swipeThreshold={1}
    vertical
    sliderHeight={height}
    itemWidth={width}
    itemHeight={height * 0.7}
    containerCustomStyle={{ flex: 9, marginHorizontal: 10 }}
    sliderWidth={width}
    renderItem={({ item, index }) => (
      <ImageBackground
        imageStyle={{ resizeMode: 'contain' }}
        style={{
          flex: 1,
          opacity: index === currentPageIndex ? 1 : 0.5,
        }}
        source={{ uri: item.uri }}
      >
        <IndexNumber value={index + 1} />
        <RemoveIcon remove={() => remove(index)} />
        <RedoIcon redo={() => redo(index)} />
      </ImageBackground>
    )}
  />
);

export default PreviewPages;
