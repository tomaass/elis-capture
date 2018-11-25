/* @flow */
import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

type Props = {
  send: Function,
  remove: Function,
  photoUri: string,
}

type State = {
  currentIndex: number,
}

class Preview extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { currentIndex: 0 };
  }

  render() {
    const { send, remove, photoUri } = this.props;
    const x = Dimensions.get('window');
    const { width, height } = x;
    const { currentIndex } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#1b1922',
          height: '100%',
        }}
      >
        <Carousel
          layout="default"
          data={[{ uri: photoUri }, { uri: photoUri }]}
          onSnapToItem={index =>
            this.setState(() => ({ currentIndex: index }))}
          swipeThreshold={1}
          vertical
          sliderHeight={height}
          itemWidth={width}
          itemHeight={height * 0.6}
          containerCustomStyle={{ flex: 9, marginHorizontal: 30 }}
          sliderWidth={width - 60}
          renderItem={({ item, index }) => (
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
                opacity: index === currentIndex ? 1 : 0.5,
              }}
              source={{ uri: item.uri }}
            />
          )}
        />
        {/* <View style={{
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
        </View> */}
      </View>
    );
  }
}
export default Preview;
