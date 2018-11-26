/* @flow */
import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import IndexNumber from '../IndexNumber';
import RemoveIcon from './components/RemoveIcon';
import RedoIcon from './components/RedoIcon';

type Props = {
  files: Array<Object>,
  multiple: boolean,
  remove: Function,
  removeAll: Function,
  send: Function,
  addPages: Function,
  redo: Function,
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
    const {
      send,
      remove,
      files,
      multiple,
      removeAll,
      addPages,
      redo,
    } = this.props;
    const { width, height } = Dimensions.get('window');
    const { currentIndex } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#1b1922',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Carousel
          layout="default"
          data={files}
          onSnapToItem={index =>
            this.setState(() => ({ currentIndex: index }))}
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
                opacity: index === currentIndex ? 1 : 0.5,
              }}
              source={{ uri: item.uri }}
            >
              <IndexNumber value={index + 1} />
              <RemoveIcon remove={() => remove(index)} />
              <RedoIcon redo={() => redo(index)} />
            </ImageBackground>
          )}
        />
        <TouchableOpacity
          onPress={addPages}
          style={{
            height: 70,
            flex: 1,
            width: '100%',
            bottom: 65,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#979797',
              borderRadius: 80,
              width: 70,
              height: 70,
            }}
          >
            <Icon
              name="plus"
              type="material-community"
              color="white"
            />
            <Text style={{ color: 'white', fontSize: 11 }}>
              add pages
            </Text>
          </View>
        </TouchableOpacity>
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
      </View>
    );
  }
}
export default Preview;
