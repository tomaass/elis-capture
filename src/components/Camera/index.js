/* @flow */
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { Camera as RNCamera, Permissions } from 'expo';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1922',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

type Props = {}
type State = { permissionsGranted: boolean }

class Camera extends React.Component<Props, State> {
  camera = null

  constructor(props: Props) {
    super(props);
    this.state = { permissionsGranted: false };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  shoot = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
    }
  };

  render() {
    const { permissionsGranted } = this.state;
    return permissionsGranted
      ? (
        <View style={styles.container}>
          <RNCamera
            type={RNCamera.Constants.Type.back}
            permissionDialogMessage="Ukážeš mi jí?"
            ref={(ref) => { this.camera = ref; }}
          />
        </View>
      )
      : <Text>Nemáš mandát kundo</Text>;
  }
}

export default Camera;
