/* @flow */
import React from 'react';
import { Permissions } from 'expo';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Preview from '../Preview';
import Camera from '../Camera';
import NoPermission from '../NoPremission';
import { uploadDocument } from '../../redux/modules/documents/actions';
import { selectQueue } from '../../redux/modules/queues/actions';
import QueuePicker from '../QueuePicker';
import type { Queue } from '../../redux/modules/queues/reducer';

export type FlashMode = 'auto' | 'on' | 'off';

type Props = {
  queues: Array<Queue>,
  selectQueue: Function,
  send: Function,
}
type State = {
  permissionsGranted: boolean,
  photo: ?Object,
  flashMode: FlashMode,
}

const flashModes: Array<FlashMode> = ['on', 'off', 'auto'];

class CameraHandler extends React.Component<Props, State> {
  camera = null

  constructor(props: Props) {
    super(props);
    this.state = {
      permissionsGranted: false,
      photo: null,
      flashMode: 'auto',
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  shoot = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      this.setState({ photo });
    }
  };

  remove = () => {
    this.setState({ photo: null });
  }

  send = () => {
    this.props.send(this.state.photo);
    this.setState({ photo: null });
  }

  onFlashModeChange = () => {
    const index = flashModes.indexOf(this.state.flashMode);
    const flashMode = flashModes[index + 1] || flashModes[0];
    this.setState({ flashMode });
  }

  render() {
    const { permissionsGranted, photo, flashMode } = this.state;
    const { queues } = this.props;
    return (
      <View style={{ position: 'relative', width: '100%', height: '100%' }}>
        {permissionsGranted
          ? photo
            ? (
              <Preview
                photoUri={photo.uri}
                remove={this.remove}
                send={this.send}
              />
            )
            : (
              <Camera
                onFlashModeChange={this.onFlashModeChange}
                flashMode={flashMode}
                getRef={(ref) => { this.camera = ref; }}
                shoot={this.shoot}
              />
            ) : <NoPermission />
          }
        {!!queues.length && (
          <QueuePicker
            queues={queues}
            onQueuePick={this.props.selectQueue}
          />
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
