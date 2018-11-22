/* @flow */
import { Text, View, StyleSheet, Button, ImageBackground } from 'react-native';
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
type State = { permissionsGranted: boolean, photoUri: string }

class Camera extends React.Component<Props, State> {
  camera = null

  constructor(props: Props) {
    super(props);
    this.state = {
      permissionsGranted: false,
      photoUri: '',
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  shoot = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      const { uri } = photo;
      this.setState({ photoUri: uri });
    }
  };

  removePhoto = () => {
    this.setState({ photoUri: '' });
  }

  render() {
    const { permissionsGranted, photoUri } = this.state;
    return permissionsGranted
      ? (
        <View style={styles.container}>
          { photoUri
            ? (
              <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1 }} source={{ uri: photoUri }}>
                  <Button
                    style={{ color: 'white', fontSize: 20 }}
                    title="Remove a photo"
                    onPress={this.removePhoto}
                  />
                </ImageBackground>
              </View>
            )
            : (
              <View style={{ flex: 1 }}>
                <RNCamera
                  style={styles.camera}
                  type={RNCamera.Constants.Type.back}
                  permissionDialogMessage="Ukážeš mi jí?"
                  ref={(ref) => { this.camera = ref; }}
                />
                <Button
                  style={{ color: 'white', fontSize: 20 }}
                  title="Take a photo"
                  onPress={this.shoot}
                />
              </View>
            )}
        </View>
      )
      : <Text>Nemáš mandát kundo</Text>;
  }
}

export default Camera;
