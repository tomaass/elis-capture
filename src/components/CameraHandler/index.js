/* @flow */
import React from 'react';
import { Permissions } from 'expo';
import { connect } from 'react-redux';
import Preview from '../Preview';
import Camera from '../Camera';
import NoPermission from '../NoPremission';
import { uploadDocument } from '../../redux/modules/documents/actions';

type Props = { send: Function }
type State = { permissionsGranted: boolean, photo: ?Object }

class CameraHandler extends React.Component<Props, State> {
  camera = null

  constructor(props: Props) {
    super(props);
    this.state = {
      permissionsGranted: false,
      photo: null,
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

  render() {
    const { permissionsGranted, photo } = this.state;
    return permissionsGranted
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
            getRef={(ref) => { this.camera = ref; }}
            shoot={this.shoot}
          />
        ) : <NoPermission />;
  }
}

const mapDispatchToProps = dispatch => ({
  send: (...args) => dispatch(uploadDocument(...args)),
});

export default connect(null, mapDispatchToProps)(CameraHandler);
