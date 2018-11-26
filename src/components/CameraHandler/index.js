/* @flow */
import React from 'react';
import { Permissions } from 'expo';
import {
  View,
  AsyncStorage,
  Platform,
  Dimensions,
} from 'react-native';
import { set, last } from 'lodash';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import loader from '../../images/loader.json';
import Preview from '../Preview';
import Camera from '../Camera';
import NoPermission from '../NoPremission';
import { uploadDocument } from '../../redux/modules/documents/actions';
import { selectQueue } from '../../redux/modules/queues/actions';
import QueuePicker from '../QueuePicker';
import type { Queue } from '../../redux/modules/queues/reducer';
import { FLASHMODE } from '../../constants/config';

export type FlashMode = 'auto' | 'on' | 'off';

type Props = {
  queues: Array<Queue>,
  currentQueueIndex: number,
  selectQueue: Function,
  send: Function,
}
type State = {
  permissionsGranted: boolean,
  files: Array<Object>,
  flashMode: FlashMode,
  ratio: string,
  showPreview: boolean,
  redoing: ?number,
  shooting: boolean,
}

const flashModes: Array<FlashMode> = ['on', 'off', 'auto'];

class CameraHandler extends React.Component<Props, State> {
  camera = null

  constructor(props: Props) {
    super(props);
    this.state = {
      permissionsGranted: false,
      files: [],
      flashMode: 'auto',
      ratio: '4:3',
      showPreview: false,
      redoing: null,
      shooting: false,
    };
  }

  async componentDidMount() {
    const flashMode = await AsyncStorage.getItem(FLASHMODE) || 'auto';
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      permissionsGranted: status === 'granted',
      flashMode,
    });
  }

  getRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
      const { width, height } = Dimensions.get('window');
      const ratios = await this.camera.getSupportedRatiosAsync();
      const wantedRatio = height / width;
      let bestRatio = 0;
      let bestRatioError = 100000;
      ratios.forEach((ratio) => {
        const [x, y] = ratio.split(':');
        if (Math.abs(wantedRatio - x / y) < bestRatioError) {
          bestRatioError = Math.abs(wantedRatio - x / y);
          bestRatio = ratio;
        }
      });
      this.setState({ ratio: bestRatio });
    }
  }

  shoot = async () => {
    if (this.camera) {
      this.setState({ shooting: true });
      const { files, redoing } = this.state;
      const photo = await this.camera.takePictureAsync();
      const newFiles = (typeof redoing === 'number')
        ? set(files, redoing, photo)
        : [...files, photo];
      const showPreview = typeof redoing === 'number' || files.length === 0;
      this.setState({
        files: newFiles,
        showPreview,
        redoing: null,
        shooting: false,
      });
    }
  };

  remove = (index) => {
    const { files } = this.state;
    const newFiles = files.filter((_, i) => index !== i);
    this.setState({
      files: newFiles,
      showPreview: newFiles.length !== 0,
    });
  }

  removeAll = () => {
    this.setState({
      files: [],
      showPreview: false,
    });
  }

  send = () => {
    this.props.send(this.state.files);
    this.removeAll();
  }

  addPages = () =>
    this.setState({ showPreview: false });

  onFlashModeChange = () => {
    const index = flashModes.indexOf(this.state.flashMode);
    const flashMode = flashModes[index + 1] || flashModes[0];
    this.setState({ flashMode });
    AsyncStorage.setItem(FLASHMODE, flashMode);
  }

  redo = (index) => {
    this.setState({
      showPreview: false,
      redoing: index,
    });
  }

  openPreview = () =>
    this.setState({ showPreview: true });

  render() {
    const {
      permissionsGranted,
      files,
      flashMode,
      showPreview,
      shooting,
    } = this.state;
    const { queues, currentQueueIndex } = this.props;
    return (
      <View style={{ position: 'relative', width: '100%', height: '100%' }}>
        {permissionsGranted
          ? showPreview
            ? (
              <Preview
                files={files}
                remove={this.remove}
                removeAll={this.removeAll}
                send={this.send}
                addPages={this.addPages}
                redo={this.redo}
                multiple={files.length > 1}
              />
            )
            : (
              <Camera
                shooting={shooting}
                onFlashModeChange={this.onFlashModeChange}
                flashMode={flashMode}
                ratio={this.state.ratio}
                onCameraReady={this.getRatio}
                getRef={(ref) => { this.camera = ref; }}
                shoot={this.shoot}
                send={this.send}
                pagesCount={files.length}
                lastFile={last(files)}
                openPreview={this.openPreview}
              />
            ) : <NoPermission />
          }
        {!!queues.length && (
          <QueuePicker
            queues={queues}
            currentQueueIndex={currentQueueIndex}
            onQueuePick={this.props.selectQueue}
          />
        )}
        {shooting && (
          <View
            style={{
              flex: 1,
              zIndex: 1,
              position: 'absolute',
              left: '30%',
              top: '30%',
              width: '40%',
              height: '40%',
            }}
          >
            <LottieView
              source={loader}
              autoPlay
              loop
            />
          </View>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  send: (...args) => dispatch(uploadDocument(...args)),
  selectQueue: (...args) => dispatch(selectQueue(...args)),
});

const mapStateToProps = state => ({
  queues: state.queues.queues,
  currentQueueIndex: state.queues.currentQueueIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraHandler);
