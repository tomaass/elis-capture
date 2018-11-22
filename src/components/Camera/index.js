/* @flow */
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text, Container, Icon, Content, Col, Grid, Footer } from 'native-base';
import React from 'react';
import { Camera as RNCamera, Permissions } from 'expo';

const styles = StyleSheet.create({
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
        <Container>
          { photoUri
            ? (
              <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1 }} source={{ uri: photoUri }}>
                  <Content />
                  <Footer style={{ backgroundColor: 'transparent' }}>
                    <Grid>
                      <Col style={{ width: '50%' }}>
                        <Button full rounded onPress={this.removePhoto}>
                          <Icon name="trash" />
                          <Text style={{ textAlign: 'left' }}>
                            Take again
                          </Text>
                        </Button>
                      </Col>
                      <Col style={{ width: '50%' }}>
                        <Button full rounded onPress={this.removePhoto}>
                          <Icon name="md-send" />
                          <Text style={{ textAlign: 'left' }}>
                            Send
                          </Text>
                        </Button>
                      </Col>
                    </Grid>
                  </Footer>
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
                <Button full onPress={this.shoot}>
                  <Icon name="camera" />
                  <Text>
                    Take a photo
                  </Text>
                </Button>
              </View>
            )}
        </Container>
      )
      : <Text>Nemáš mandát kundo</Text>;
  }
}

export default Camera;
