/* @flow */
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import PreviewFooter from '../PreviewFooter';
import PreviewPages from '../PreviewPages';
import AddPagesButton from './components/AddPagesButton';

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
      <View style={styles.Preview}>
        <PreviewPages
          height={height}
          width={width}
          remove={remove}
          redo={redo}
          currentPageIndex={currentIndex}
          pages={files}
          onPageChange={index =>
            this.setState(() => ({ currentIndex: index }))}
        />
        <AddPagesButton onPress={addPages} />
        <PreviewFooter
          multiple={multiple}
          removeAll={removeAll}
          send={send}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Preview: {
    flex: 1,
    backgroundColor: '#1b1922',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Preview;
